const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const slugify = require('slugify')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const mongooseDelete = require('mongoose-delete')
const ErrorResponse = require('../../utils/ErrorResponse')

// Schema
const UserSchema = new mongoose.Schema(
  {
    email: {
      // /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
      require: [true, 'Please add a email'],
      unique: true,
    },
    facebookID: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      require: [true, 'Please add password'],
      //   select: false,
      minlength: 3,
      select: false,
    },
    addresses: [
      {
        idDefault: {
          type: Boolean,
          default: false,
        },
        address: String,
        detailAddress: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'address',
        },
      },
    ],
    phone: String,
    name: String,
    fullName: String,
    firstName: String,
    lastName: String,
    gender: String,
    provider: {
      type: String,
      default: 'TGDD',
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
        default: 'avatars/muqwmegdp6xzikzgsdkw',
      },
      url: {
        type: String,
        required: true,
        default:
          'https://res.cloudinary.com/dw8fi9npd/image/upload/v1667137085/avatars/muqwmegdp6xzikzgsdkw.jpg',
      },
    },
    //
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },

    emailCodeToken: String,
    emailCodeExpires: Date,
    enable: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createAt: {
      type: Date,
      default: Date.now,
      require: true,
    },
    refreshToken: String,
    refreshTokenExpires: Date,
  },
  {
    timestamps: true,
  }
)
UserSchema.plugin(mongooseDelete, {
  overrideMethods: 'all',
  deleteAt: true,
})
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Slugify
UserSchema.pre('save', function (next) {
  let fullNameRaw = this.firstName
    ? `${this.firstName} ${this.lastName}`
    : this.name
  this.fullName = slugify(fullNameRaw, {
    replacement: '-',
    trim: true,
    lower: true,
  })

  next()
})
// @@Generate token
// generate access token
UserSchema.methods.getJwtToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRES_TIME,
    }
  )
}
// Generate refreshToken
UserSchema.methods.getRefreshToken = function () {
  // random
  const refreshTokenHot = crypto.randomBytes(20).toString('hex')
  // hash and set
  this.refreshToken = crypto
    .createHash('sha256')
    .update(refreshTokenHot)
    .digest('hex')
  //expires by day
  this.refreshTokenExpires =
    Date.now() + 60 * 1000 * 60 * 24 * process.env.REFRESH_TOKEN_EXPIRES_TIME
  //expires
  return refreshTokenHot
}
// Encrypting password before saving user
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  this.password = await bcrypt.hash(this.password, 10)
})

// Compare user password
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}
// Generate code to verify email
UserSchema.methods.verifyEmailToken = function () {
  // Generate token
  const verifyToken = crypto.randomBytes(20).toString('hex')

  // Hash and set to resetPasswordToken
  this.emailCodeToken = crypto
    .createHash('sha256')
    .update(verifyToken)
    .digest('hex')
  //expires
  this.emailCodeExpires = Date.now() + 60 * 1000 * 30

  return verifyToken
}

// exports
let User = mongoose.model('users', UserSchema)
module.exports = User
module.exports.schema = UserSchema
