const ErrorResponse = require('../utils/ErrorResponse')
const User = require('../models/user/User')
const Address = require('../models/user/Address')
const catchAsyncHandler = require('../middleware/async')
const asyncHandler = require('express-async-handler')
class userControllers {
  //@desc GET user profile
  //@route POST / api/users/profile
  //@access Private
  getUserProfile = catchAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    if (!user) {
      return next(new ErrorResponse('User not found', 404))
    }
    res.status(200).json({
      success: true,
      user,
      message: 'User Info',
    })
  })
  //@desc UPDATE user profile
  //@route PUT api/users/profile
  //@access Private
  updateUserProfile = catchAsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if (!user) {
      return next(new ErrorResponse('User not found', 401))
    }
    //
    const { addressID, name, phone, gender, addresses, isNew } = req.body

    const idDefault = req.body.addresses[0].idDefault
    user.name = name || user.name
    user.phone = phone || user.phone
    user.gender = gender || user.gender
    //
    if (idDefault) {
      user.addresses = user.addresses.map((v) => {
        v.idDefault = false
        return v
      })
    }
    console.log(isNew)

    if (isNew) {
      // Add address
      const address = await Address.create({
        ...addresses[0].detailAddress,
      })

      user.addresses.push({
        ...addresses[0],
        idDefault,
        detailAddress: address,
      })
    } else {
      // Update address
      const { editAddress } = req.body
      if (editAddress) {
        Address.findByIdAndUpdate(
          editAddress,
          {
            ...addresses[0].detailAddress,
          },
          (err) => {
            if (err) return next(new ErrorResponse('Cant update address', 400))
          }
        )

        const newA = user.addresses.map((address) => {
          if (address.detailAddress._id.toString() == editAddress) {
            address.address = addresses[0].address
            address.idDefault = idDefault
          }
          return address
        })
        user.addresses = newA
      }
    }

    const updateUser = await user.save({
      validateBeforeSave: false,
    })

    res.status(200).json({
      success: true,
      message: 'User updated',
      user: updateUser,
    })
  })

  // @desc UPDATE User avatar picture
  //@route PUT api/users/avatar
  //@access Private
  updateUserAvatar = catchAsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if (!user) {
      return next(new ErrorResponse('User not found', 401))
    }
    // req.file
    // {
    //     fieldname: 'image',
    //     originalname: 'táº£i xuá»\x91ng.png',
    //     encoding: '7bit',
    //     mimetype: 'image/png',
    //     path: 'https://res.cloudinary.com/dw8fi9npd/image/upload/v1668409911/userAvatar/636ca45b5f202794bb590934.png',
    //     size: 7954,
    //     filename: 'userAvatar/636ca45b5f202794bb590934'
    //   }
    user.avatar.url = req.file.path
    user.avatar.public_id = user._id
    user.save((err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: `Try again. Cant update avatar: ${err.message}`,
          avatar: result.avatar.url,
        })
      }
      return res.status(200).json({
        success: true,
        message: `Avatar Updated`,
        avatar: result.avatar,
      })
    })
  })

  // ##DELETE ADDRESS
  // DELETE /api/users/address/:addressID
  deleteAddress = catchAsyncHandler(async (req, res) => {
    const { addressID } = req.params
    const user = await User.findById(req.user.id)

    const addresses = user.addresses.filter((v) => {
      return v.detailAddress._id.toString() != addressID
    })

    user.addresses = addresses

    await user.save({
      validateBeforeSave: false,
    })

    res.status(200).json({
      success: true,
      message: 'Address deleted',
    })
  })
  // GET /api/users/address/:addressID
  getAddress = catchAsyncHandler(async (req, res, next) => {
    const { addressID } = req.params
    const address = await Address.findById(addressID)
    if (!address) return next(new ErrorResponse('Address not found', 404))

    res.json({
      success: true,
      address,
    })
  })
  //@desc UPDATE user profile
  //@route PUT / api/users/:id
  //@access Private
  updateUser = catchAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.isAdmin = req.body.isAdmin || user.isAdmin
      const updateUser = await user.save()
      res.json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
      })
    } else {
      res.status(401)
      return next(new ErrorResponse('User not found', 404))
    }
  })
  //@desc GET all user profile
  //@route GET / api/users
  //@access Private
  getUsers = catchAsyncHandler(async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: 'i' } },
            { email: { $regex: req.query.search, $options: 'i' } },
          ],
        }
      : {}
    if (keyword) {
      const users = await User.find(keyword).find({
        _id: { $ne: req.user._id },
      })
      res.status(200).json(users)
    } else {
      const pageSize = 10
      const page = Number(req.query.page) || 1
      const count = await User.count({})
      const users = await User.find({})
        .limit(pageSize)
        .skip(pageSize * (page - 1))
      if (users) {
        res.json({
          users,
          page,
          pages: Math.ceil(count / pageSize),
        })
      } else {
        res.status(404)
        return next(new ErrorResponse('Product not found', 404))
      }
    }
  })
  //@desc Delete  user profile
  //@route GET / api/users
  //@access Private
  deleteUser = catchAsyncHandler(async (req, res) => {
    const user = await User.delete({
      _id: req.params.id,
    })
    if (user) {
      res.json({
        message: 'User removed',
      })
    } else {
      res.status(404)
      return next(new ErrorResponse('User not found', 404))
    }
  })
  // @desc    restore a User
  // @route   DELETE /api/users/:id/restore
  // @access  Private/Admin
  restoreUser = catchAsyncHandler(async (req, res) => {
    const user = await User.restore({
      _id: req.params.id,
    })
    if (user) {
      res.json({
        message: 'restored',
      })
    } else {
      res.status(404)
      return next(new ErrorResponse('Product not found', 404))
    }
  })
  // @desc    force a user
  // @route   FORCE /api/user/:id/force
  // @access  Private/Admin
  forceUser = catchAsyncHandler(async (req, res) => {
    const user = await User.deleteOne({
      _id: req.params.id,
    })
    if (user) {
      res.json({
        message: 'Product removed',
      })
    } else {
      res.status(404)
      return next(new ErrorResponse('Product not found', 404))
    }
  })
  getTrashUsers = catchAsyncHandler(async (req, res, next) => {
    // const products = await Product.countDeleted
    const pageSize = 10
    const page = Number(req.query.page) || 1
    const count = await User.countDeleted()
    const users = await User.findDeleted()
      .limit(pageSize)
      .skip(pageSize * (page - 1))
    if (users) {
      res.json({
        users,
        page,
        pages: Math.ceil(count / pageSize),
      })
    } else {
      res.status(404)
      return next(new ErrorResponse('Product not found', 404))
    }
  })
  //@desc GET  user
  //@route GET / api/users/:id
  //@access Private
  getUserById = catchAsyncHandler(async (req, res) => {
    const users = await User.findById(req.params.id).select('-password')
    if (users) {
      res.json(users)
    } else {
      res.status(404)
      return next(new ErrorResponse('User not found', 404))
    }
  })
  //@desc UPDATE user profile
  //@route PUT / api/users/:id
  //@access Private
  updateUser = catchAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.isAdmin = req.body.isAdmin || user.isAdmin
      const updateUser = await user.save()
      res.json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
      })
    } else {
      res.status(401)
      return next(new ErrorResponse('User not found', 404))
    }
  })
}
module.exports = new userControllers()
