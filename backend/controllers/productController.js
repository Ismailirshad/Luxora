import cloudinary from "../config/cloudinary.js";
import Product from "../models/Product.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch all products" })
    }
};

export const getFeaturedProducts = async (req, res) => {
    try {
        let featuredProducts = await Product.find({ isFeatured: true }).limit(8).lean();

        if (!featuredProducts) {
            res.status(404).json({ message: "No featured products found" })
        }
        res.json(featuredProducts)
    } catch (error) {
        console.log("Error in getFeaturedProducts", error.message)
        res.status(500).json({ message: "Failed to fetch featured products" })
    }
}

export const createProduct = async (req, res) => {
    try {
        const { name, price, description, category, image, } = req.body;

        let cloudinaryResponse = null
        if (image) {
            cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" })
        }

        const product = await Product.create({
            name,
            description,
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
            category,
            price
        })

        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({ message: "Failed to create product" })
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        if (product.image) {
            //how it stored on cloudinary
            //https://res.cloudinary.com/demo/image/upload/v1731188239/products/abc123xyz.webp
            const publicId = product.image.split('/').pop().split('.')[0]
            try {
                await cloudinary.uploader.destroy(`products/${publicId}`)
                console.log("deleted image from cloudinary")
            } catch (error) {
                console.log("error in deleting image from cloudinary", error)
            }
        }
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Product deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "Failed to delete product" })
    }
}
export const getRecomendedProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
                $sample: { size: 3 }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    image: 1,
                    price: 1
                }
            }
        ]);

        res.json(products)
    } catch (error) {
        console.log("error in getting recomended products", error)
        res.status(500).json({ message: "Failed to get recomended products" });
    }
};

export const getProductsByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const products = await Product.find({ category });
        res.json({ products })
    } catch (error) {
        console.log("error in getting products by category", error)
        res.status(500).json({ message: "Failed to get products by category" });
    }
};

export const toggleFeaturedProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (product) {
            product.isFeatured = !product.isFeatured;
            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.log("error in toggling featured product", error.message);
        res.status(500).json({ message: "Failed to toggle featured product" });
    }
}