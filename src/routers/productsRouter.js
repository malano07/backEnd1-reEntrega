const express = require('express');
const ProductManager = require('../managers/ProductManagerDB'); 
const router = express.Router();


router.get('/', async (req, res) => {
    const { limit = 10, page = 1, sort, query } = req.query;
    const filter = {};

    if (query) {
        filter.$or = [
            { category: { $regex: query, $options: 'i' } },
            { status: query === 'available' ? true : false },
        ];
    }

    const options = {
        limit: parseInt(limit),
        page: parseInt(page),
        sort: sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {},
    };

    try {
        const products = await ProductManager.getProducts(filter, options);
        res.render('products', {
            title: 'Productos',
            products: products.docs,
            pagination: {
                page: products.page,
                totalPages: products.totalPages,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
            },
        });
    } catch (error) {
        console.error('Error al cargar productos:', error);
        res.status(500).render('error', { message: 'Error al cargar los productos' });
    }
});


router.get('/:pid', async (req, res) => {
    const { pid } = req.params;

    try {
        const product = await ProductManager.getProductById(pid);
        res.render('productDetails', {
            title: product.title,
            product,
        });
    } catch (error) {
        console.error('Error al cargar el producto:', error);
        res.status(404).render('error', { message: 'Producto no encontrado' });
    }
});


router.post('/', async (req, res) => {
    try {
        const newProduct = await ProductManager.createProduct(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.put('/:pid', async (req, res) => {
    const { pid } = req.params;

    try {
        const updatedProduct = await ProductManager.updateProduct(pid, req.body);
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.delete('/:pid', async (req, res) => {
    const { pid } = req.params;

    try {
        await ProductManager.deleteProduct(pid);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
