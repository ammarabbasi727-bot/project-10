const express = require('express')
const router = express.Router()
const productController = require('../controllers/Product_controller')

// Create a new product
router.post('/products', productController.createProduct)

// Get all products
router.get('/products', productController.getAllProducts)

// Get product by ID
router.get('/products/:id', productController.getProductById)

// Update product
router.put('/products/:id', productController.updateProduct)

// Delete product
router.delete('/products/:id', productController.deleteProduct)

module.exports = router