const Cart = require('../models/Cart');

class CartManager {
    
    async createCart() {
        return await Cart.create({ products: [] });
    }

    
    async getCartById(cid) {
        return await Cart.findById(cid).populate('products.product');
    }

   
    async addProductToCart(cid, pid, quantity = 1) {
        const cart = await Cart.findById(cid);
        if (!cart) throw new Error('Carrito no encontrado');

        const existingProduct = cart.products.find(p => p.product.toString() === pid);
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ product: pid, quantity });
        }

        return await cart.save();
    }

    
    async removeProductFromCart(cid, pid) {
        const cart = await Cart.findById(cid);
        if (!cart) throw new Error('Carrito no encontrado');

        cart.products = cart.products.filter(p => p.product.toString() !== pid);
        return await cart.save();
    }

    
    async updateCartProducts(cid, products) {
        const cart = await Cart.findByIdAndUpdate(
            cid,
            { products },
            { new: true }
        ).populate('products.product');

        if (!cart) throw new Error('Carrito no encontrado');
        return cart;
    }

    
    async updateProductQuantity(cid, pid, quantity) {
        const cart = await Cart.findById(cid);
        if (!cart) throw new Error('Carrito no encontrado');

        const product = cart.products.find(p => p.product.toString() === pid);
        if (!product) throw new Error('Producto no encontrado en el carrito');

        product.quantity = quantity;
        return await cart.save();
    }

   
    async clearCart(cid) {
        return await Cart.findByIdAndUpdate(
            cid,
            { products: [] },
            { new: true }
        );
    }
}

module.exports = new CartManager();
