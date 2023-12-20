const Product = require("../models/product/productModel");
const Manufacturer = require("../models/manufacturer/manufacturer");
const SubCategory = require("../models/subCategory/subCategory");
const Category = require("../models/category/category");
const Comment = require("../models/comment/comment");
const cloudinary = require("cloudinary");
const asyncHandler = require("../middleware/async");
const {
    Configuration,
    OpenAIApi
} = require("openai");
class ProductController {
    //[GET] /api/products
    // @desc    Fetch single product
    // @route   GET /api/products/
    // @access  Public
    index = asyncHandler(async(req, res) => {
        const pageSize = req.query.size || 10;
        const page = Number(req.query.page) || 1;

        const keyword = req.query.keyword ? {
            name: {
                $regex: req.query.keyword,
                $options: "i",
            },
        } : {};

        const count = await Product.count({
            ...keyword,
        });
        const products = await Product.find({
                ...keyword,
            })
            .select("name price rating image productOptions numReviews")
            .limit(pageSize)
            .skip(pageSize * (page - 1));
        if (products) {
            res.json({
                products,
                page: req.query.page,
                pages: Math.ceil(count / pageSize),
            });
        } else {
            res.status(404);
            throw new Error("Product not found");
        }
    });
    getProductById = asyncHandler(async(req, res) => {
        const product = await Product.findById(req.params.id);
        const manufacturer = await Manufacturer.findById(product.manufacturer);
        const subCategory = await SubCategory.findById(product.subCategory);
        const category = await Category.findById(subCategory.category);
        const comments = await Comment.find({
            product: product._id,
        });

        if (product) {
            const result = {
                _id: product._id,
                manufacturer: manufacturer.name,
                name: product.name,
                event: product.event,
                image: product.image,
                video: product.video,
                productOptions: product.productOptions,
                description: product.description,
                subCategory: subCategory.name,
                category: category.name,
                comments: comments,
                rating: product.rating,
                price: product.price,
                detailSpecs: product.detailSpecs,
                countInStock: product.countInStock,
                numReviews: product.numReviews,
                reviews: product.reviews,
            };
            // product.comments = comments
            // res.json({ ...product, category: category.name })
            res.status(200).json(result);
        } else {
            res.status(404);
            throw new Error("Product not found");
        }
    });
    // @desc    get product By category
    // @route   GET /api/products/category/:slug
    // @access  Public
    getProductsByCategory = asyncHandler(async(req, res) => {
        const categoryId = await Category.findOne({
            name: req.params.slug,
        });
        const product = await Product.find({})
            .populate({
                path: "subCategory",
                match: {
                    category: categoryId._id,
                },
            })
            .select("name image rating price subCategory productOptions");
        const result = [];
        product.map((item, index) => {
            if (item.subCategory !== null) {
                result.push(item);
            }
        });
        res.json(result);
    });
    // @desc    get product By category
    // @route   GET /api/products/subcategory/:id
    // @access  Public
    getProductsBySubCategory = asyncHandler(async(req, res) => {
        const product = await Product.find({
            subCategory: req.params.id,
        }).select("name image rating price");
        if (product) {
            res.status(201).json({
                success: true,
                product,
            });
        } else {
            res.status(404).json({
                success: false,
                message: "product not found",
            });
        }
    });
    // @desc    Delete a product
    // @route   DELETE /api/products/:id
    // @access  Private/Admin
    deleteProduct = asyncHandler(async(req, res) => {
        const product = await Product.delete({
            _id: req.params.id,
        });
        if (product) {
            res.json({
                message: "Product removed",
            });
        } else {
            res.status(404);
            throw new Error("Product not found");
        }
    });
    // @desc    restore a product
    // @route   DELETE /api/products/:id/restore
    // @access  Private/Admin
    restoreProduct = asyncHandler(async(req, res) => {
        const product = await Product.restore({
            _id: req.params.id,
        });
        if (product) {
            res.json({
                message: "restored",
            });
        } else {
            res.status(404);
            throw new Error("Product not found");
        }
    });
    // @desc    restore a product
    // @route   DELETE /api/products/:id/force
    // @access  Private/Admin
    forceProduct = asyncHandler(async(req, res) => {
        const product = await Product.deleteOne({
            _id: req.params.id,
        });
        if (product) {
            res.json({
                message: "Product removed",
            });
        } else {
            res.status(404);
            throw new Error("Product not found");
        }
    });
    // @desc    Create a product
    // @route   POST /api/products
    // @access  Private/Admin
    createProduct = asyncHandler(async(req, res) => {
        // await cloudinary.v2.uploader.upload(req.body.image, {
        //   folder: 'products',
        // })
        // for (let i = 0; i < req.body.productOptions.length; i++) {
        //   for (let j = 0; i < req.body.productOptions[i].colors.length; j++) {}
        // }
        // res.status(201).json(createdProduct)
        for (let o = 0; o < req.body.productOptions.length; o++) {
            for (let c = 0; c < req.body.productOptions[o].colors.length; c++) {
                let images = [];
                if (typeof req.body.productOptions[o].colors[c].images === "string") {
                    images.push(req.body.productOptions[o].colors[c].images);
                } else {
                    images = req.body.productOptions[o].colors[c].images;
                }
                let imagesLinks = [];
                for (let i = 0; i < images.length; i++) {
                    console.log("ULPOAD IMAGE");
                    const result = await cloudinary.v2.uploader.upload(
                        images[i].urlImage, {
                            folder: "fileUploads",
                        }
                    );
                    console.log("ULPOAD IMAGE DONE", result);
                    imagesLinks.push({
                        public_id: result.public_id,
                        urlImage: result.secure_url,
                    });
                }
                req.body.productOptions[o].colors[c].images = imagesLinks;
            }
        }
        req.body.user = req.user.id;
        req.body.price = req.body.productOptions[0].price;
        req.body.image = req.body.productOptions[0].colors[0].images[0].urlImage;
        console.log("CREATE PRODUCT", req.body);
        try {

            const product = await Product.create(req.body);
            console.log("CREATE PRODUCT DONE", req.body);
            if (product) {
                res.status(201).json({
                    success: true,
                });
            } else {
                res.status(404);
                throw new Error("Product not found");
            }
        } catch (err) {
            res.status(404).json({
                error: err
            });
        }
    });

    // @desc    Update a product
    // @route   PUT /api/products/:id
    // @access  Private/Admin
    updateProduct = asyncHandler(async(req, res) => {
        let product = await Product.findById(req.params.id);
        if (product) {
            // product.name = name
            // product.price = price
            // product.description = description
            // product.image = image
            // product.brand = brand
            // product.category = category
            // product.countInStock = countInStock
            // const updatedProduct = await product.save()
            for (let o = 0; o < req.body.productOptions.length; o++) {
                //o ===Option
                for (let c = 0; c < req.body.productOptions[o].colors.length; c++) {
                    // c=== Color
                    if (req.body.productOptions[o].colors[c].onChange) {
                        for (
                            let i = 0; i < product.productOptions[o].colors[c].images.length; i++
                        ) {
                            if (product.productOptions[o].colors[c].images[i].public_id) {
                                const result = await cloudinary.v2.uploader.destroy(
                                    product.productOptions[o].colors[c].images[i].public_id
                                );
                            }
                        }
                        let images = [];
                        if (
                            typeof req.body.productOptions[o].colors[c].images === "string"
                        ) {
                            images.push(req.body.productOptions[o].colors[c].images);
                        } else {
                            images = req.body.productOptions[o].colors[c].images;
                        }
                        let imagesLinks = [];
                        for (let i = 0; i < images.length; i++) {
                            const result = await cloudinary.v2.uploader.upload(
                                images[i].urlImage, {
                                    folder: "products",
                                }
                            );
                            imagesLinks.push({
                                public_id: result.public_id,
                                urlImage: result.secure_url,
                            });
                        }
                        req.body.productOptions[o].colors[c].images = imagesLinks;
                    }
                }
            }
            product = await Product.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
                useFindAndModify: false,
            });
            res.status(200).json(product);
        } else {
            res.status(404);
            throw new Error("Product not found");
        }
    });

    // @desc    Create new review
    // @route   POST /api/products/:id/reviews
    // @access  Private
    createProductReview = asyncHandler(async(req, res) => {
        const {
            rating,
            comment
        } = req.body;

        const product = await Product.findById(req.params.id);

        if (product) {
            const alreadyReviewed = product.reviews.find(
                (r) => r.user.toString() === req.user._id.toString()
            );

            if (alreadyReviewed) {
                product.reviews.forEach((review) => {
                    if (review.user.toString() === req.user._id.toString()) {
                        review.comment = comment;
                        review.rating = rating;
                    }
                });
            } else {
                const review = {
                    user: req.user._id,
                    name: req.user.name,
                    avatarUrl: req.user.avatar.url,
                    rating: Number(rating),
                    comment,
                };

                product.reviews.push(review);
            }
            product.numReviews = product.reviews.length;

            product.rating = product.reviews.reduce(
                (acc, item) => item.rating + acc,
                0
            );
            product.rating = product.rating / product.reviews.length;

            await product.save();
            res.status(201).json({
                message: "Review added",
            });
        } else {
            res.status(404);
            throw new Error("Product not found");
        }
    });
    deleteProductReview = asyncHandler(async(req, res) => {
        const product = await Product.findById(req.params.id);

        if (product) {
            const reviews = product.reviews.filter(
                (review) => review._id.toString() !== req.query.reviewId.toString()
            );
            const numReviews = reviews.length;
            const rating =
                product.reviews.reduce((acc, item) => item.rating + acc, 0) /
                reviews.length;
            await Product.findByIdAndUpdate(
                req.params.id, {
                    reviews,
                    rating,
                    numReviews,
                }, {
                    new: true,
                    runValidators: true,
                    useFindAndModify: false,
                }
            );
            res.status(200).json({
                success: true,
            });
        } else {
            res.status(404);
            throw new Error("Product not found");
        }
    });
    // @desc    Get top rated products
    // @route   GET /api/products/top
    // @access  Public
    getTopProducts = asyncHandler(async(req, res) => {
        const categoryId = req.body.categoryId ? req.body.categoryId : null;
        if (categoryId) {
            const products = await Product.find({})
                .populate({
                    path: "subCategory",
                    match: {
                        category: categoryId,
                    },
                })
                .sort({
                    rating: -1,
                })
                .select("name ratting price image");
            const arr = [];
            products.map((product) => {
                if (product.subCategory !== null) {
                    arr.push(product);
                }
            });
            const result = arr.slice(0, 6);
            res.status(200).json({
                success: true,
                data: result,
                message: "sort by category",
            });
        } else {
            const products = await Product.find({})
                .sort({
                    rating: -1,
                })
                .limit(6)
                .select("name ratting price image");
            res.json(products);
        }
    });
    // @desc    Get count product
    // @route   GET /api/products/count
    // @access  private
    countProducts = asyncHandler(async(req, res) => {
        const count = await Product.count({});
        res.json(count);
    });
    getTrashProducts = asyncHandler(async(req, res, next) => {
        // const products = await Product.countDeleted
        const pageSize = 10;
        const page = Number(req.query.page) || 1;
        const count = await Product.countDeleted();
        const products = await Product.findDeleted()
            .select("name price rating image ")
            .limit(pageSize)
            .skip(pageSize * (page - 1));
        if (products) {
            res.json({
                products,
                page,
                pages: Math.ceil(count / pageSize),
            });
        } else {
            res.status(404);
            throw new Error("Product not found");
        }
    });
    compareProducts = asyncHandler(async(req, res, next) => {
        const configuration = new Configuration({
            apiKey: process.env.Chat_GPT_KEY,
        });
        const openai = new OpenAIApi(configuration);
        const {
            message
        } = req.body;
        console.log(message);
        const response = await openai.createCompletion({
            model: "text-davinci-001",
            prompt: `${message}`,
            top_p: 0.5,
            max_tokens: 2000,
            temperature: 1,
        });
        if (response) {
            res.json({
                message: response.data.choices[0].text.trim()
            });
        }
    });
}
module.exports = new ProductController();