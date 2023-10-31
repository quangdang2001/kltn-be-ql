const mongoose = require('mongoose')
const dotenv = require('dotenv')
const colors = require('colors')
const products = require('../data/products')
const {
  productsTabletSamsung,
  productTabletApple,
  productTabletLenovo,
} = require('../data/productTablet')
const {
  LaptopDell,
  LaptopLenovo,
  LaptopMacOs,
} = require('../data/productLapTop')
const Product = require('../models/product/productModel.js')
const User = require('../models/user/User.js')
const users = require('../data/users.js')
const Order = require('../models/order/orderModal.js')
const Manufacturer = require('../models/manufacturer/manufacturer.js')
const manufacturers = require('../data/manufacturer')
// const Color = require('../models/color/color.js')
// const Colors = require('../data/colors.js')
const Category = require('../models/category/category.js')
const categories = require('../data/categories.js')
const subCategory = require('../models/subCategory/subCategory.js')
const subCategories = require('../data/subCategories.js')
const productOptions = require('../data/productOptions.js')
const image = require('../data/images.js')
const Event = require('../models/event/event.js')
const event = require('../data/event')
const connectDB = require('../config/db')

dotenv.config()

connectDB.connect()

const importData = async () => {
  try {
    const manufactureDell = await Manufacturer.findOne({ name: 'Dell' })
    const manufactureLenovo = await Manufacturer.findOne({ name: 'Lenovo' })
    const manufactureApple = await Manufacturer.findOne({ name: 'Apple' })
    const categoryLaptop = await Category.findOne({
      name: 'Laptop',
    })
    const subCategoryLapTopWindow = await subCategory.findOne({
      name: 'Windows',
      category: categoryLaptop._id,
    })
    const subCategoryLapTopOS = await subCategory.findOne({
      name: 'Mac OS',
      category: categoryLaptop._id,
    })
    const createLaptopDell = LaptopDell.map((product) => {
      return {
        ...product,
        user: Object('63743f9d9878bcdd84b43795'),
        manufacturer: manufactureDell._id,
        subCategory: subCategoryLapTopWindow._id,
      }
    })
    await Product.insertMany(createLaptopDell)
    console.log('Done Dell'.green.inverse)
    const createLaptopLenovo = LaptopLenovo.map((product) => {
      return {
        ...product,
        user: Object('63743f9d9878bcdd84b43795'),
        manufacturer: manufactureLenovo._id,
        subCategory: subCategoryLapTopWindow._id,
      }
    })
    await Product.insertMany(createLaptopLenovo)
    console.log('Done Lenovo'.green.inverse)
    const createLaptopMacOs = LaptopMacOs.map((product) => {
      return {
        ...product,
        user: Object('63743f9d9878bcdd84b43795'),
        manufacturer: manufactureApple._id,
        subCategory: subCategoryLapTopOS._id,
      }
    })

    await Product.insertMany(createLaptopMacOs)
    console.log('Done MacOS'.green.inverse)
    /**   product tablet
    const manufactureSamSum = await Manufacturer.findOne({ name: 'SamSung' })

    const manufactureApple = await Manufacturer.findOne({ name: 'Apple' })
    const manufactureLenovo = await Manufacturer.findOne({ name: 'Lenovo' })
    const categoryTablet = await Category.findOne({ name: 'Tablet' })
    const subCategoryAndroid = await subCategory.findOne({
      category: categoryTablet._id,
      name: 'Android',
    })
    const subCategoryIOS = await subCategory.findOne({
      category: categoryTablet._id,
      name: 'IOS',
    })
    const createproductsTabletSamsung = productsTabletSamsung.map((product) => {
      return {
        ...product,
        user: Object('63743f9d9878bcdd84b43795'),
        manufacturer: manufactureSamSum._id,
        subCategory: subCategoryAndroid._id,
      }
    })
    await Product.insertMany(createproductsTabletSamsung)
    const createproductTabletApple = productTabletApple.map((product) => {
      return {
        ...product,
        user: Object('63743f9d9878bcdd84b43795'),
        manufacturer: manufactureApple._id,
        subCategory: subCategoryIOS._id,
      }
    })
    await Product.insertMany(createproductTabletApple)
    const createproductTabletLenovo = productTabletLenovo.map((product) => {
      return {
        ...product,
        user: Object('63743f9d9878bcdd84b43795'),
        manufacturer: manufactureLenovo._id,
        subCategory: subCategoryAndroid._id,
      }
    })
    await Product.insertMany(createproductTabletLenovo) */
    // const category = await Category.find({ name: 'Tablet' })
    // await Manufacturer.insertMany(manufacturers)
    // await Event.deleteMany()
    // const createEvent = await Event.insertMany(event)
    // const products = await Product.find({})
    // products.map(async (product, index) => {
    //   if (index % 2 === 0) {
    //     product.event = createEvent[0]._id
    //     await product.save()
    //   } else {
    //     product.event = createEvent[1]._id
    //     await product.save()
    //   }
    // })
    // await Order.deleteMany()
    // await Product.deleteMany()
    // await User.deleteMany()
    // await Manufacturer.deleteMany()
    // await Color.deleteMany()
    // await Category.deleteMany()
    // await subCategory.deleteMany()
    // const createUser = await User.insertMany(users)
    // console.log('Inserted User')
    // const adminUser = createUser[0]._id
    // const sampleManufacturer = manufacturers.map((manufacturer) => {
    //   return { ...manufacturer, user: adminUser }
    // })
    // const createManufacturer = await Manufacturer.insertMany(sampleManufacturer)
    // console.log('Inserted Manufacturer')
    // const manufacturerId = createManufacturer[0]._id
    // const sampleColors = Colors.map((color) => {
    //   return { ...color, user: adminUser }
    // })
    // const createColor = await Color.insertMany(sampleColors)
    // console.log('Inserted Color')
    // const sampleCategories = categories.map((category) => {
    //   return { ...category, user: adminUser }
    // })
    // const createCategory = await Category.insertMany(sampleCategories)
    // console.log('Inserted Category')
    // const categoryId = createCategory[0]._id
    // const sampleSubCategories = subCategories.map((subCategory) => {
    //   return { ...subCategory, user: adminUser, category: categoryId }
    // })
    // const createSubcategory = await subCategory.insertMany(sampleSubCategories)
    // console.log('Inserted subCategory')
    // const sampleOptions = productOptions.map((option) => {
    //   const colors = []
    //   createColor.map((color) => {
    //     if (color.name === 'Vàng') {
    //       const value = {
    //         color: createColor[0]._id,
    //         quantity: 10,
    //         images: image.imagesId1,
    //       }
    //       colors.push(value)
    //     } else if (color.name === 'Bạc') {
    //       const value = {
    //         color: createColor[1]._id,
    //         quantity: 10,
    //         images: image.imagesId2,
    //       }
    //       colors.push(value)
    //     } else if (color.name === 'Trắng') {
    //       const value = {
    //         color: createColor[2]._id,
    //         quantity: 10,
    //         images: image.imagesId3,
    //       }
    //       colors.push(value)
    //     } else if (color.name === 'Tím') {
    //       const value = {
    //         color: createColor[3]._id,
    //         quantity: 10,
    //         images: image.imagesId4,
    //       }
    //       colors.push(value)
    //     }
    //   })
    //   return { ...option, colors: colors }
    // })
    //   const sampleProducts = products.map((product) => {
    //     return {
    //       ...product,
    //       user: adminUser,
    //       manufacturer: manufacturerId,
    //       subCategory: createSubcategory[0]._id,
    //     }
    //   })
    //   await Product.insertMany(sampleProducts)
    //   console.log('Data Imported successfully'.green.inverse)
    //   process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Product.deleteMany()
    console.log('Data destroy successfully'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
