const Product = require('../models/product_model');

exports.createProduct = async (req, res) => {
    try {
        const { title, price, description, category } = req.body;
        if (!title || !price || !description || !category) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        const newProduct = new Product({
            title,
            price,
            description,
            category
        });
        const productData = await newProduct.save();

        res.status(201).json({ 
            message: 'Product created successfully',
            data: productData
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create product', details: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ 
            message: 'Products retrieved successfully',
            data: products
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve products', details: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ 
            message: 'Product retrieved successfully',
            data: product
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve product', details: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, price, description, category } = req.body;
        
        const product = await Product.findByIdAndUpdate(
            id,
            { title, price, description, category },
            { new: true, runValidators: true }
        );
        
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        res.status(200).json({ 
            message: 'Product updated successfully',
            data: product
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product', details: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        res.status(200).json({ 
            message: 'Product deleted successfully',
            data: product
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product', details: error.message });
    }
};