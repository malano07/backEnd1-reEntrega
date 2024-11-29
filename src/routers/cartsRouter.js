const express = require('express');
const CartManager = require('../managers/CartManagerDB');
const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const newCart = await CartManager.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/:cid', async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await CartManager.getCartById(cid);
        if (!cart) {
            return res.status(404).render('error', { message: 'Carrito no encontrado' });
        }

        res.render('cartDetails', {
            title: 'Detalle del Carrito',
            cart,
        });
    } catch (error) {
        res.status(500).render('error', { message: 'Error al cargar el carrito' });
    }
});


router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const updatedCart = await CartManager.addProductToCart(cid, pid);
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const updatedCart = await CartManager.removeProductFromCart(cid, pid);
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.put('/:cid', async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;

    try {
        const updatedCart = await CartManager.updateCartProducts(cid, products);
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.put('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const updatedCart = await CartManager.updateProductQuantity(cid, pid, quantity);
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.delete('/:cid', async (req, res) => {
    const { cid } = req.params;

    try {
        const updatedCart = await CartManager.clearCart(cid);
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
