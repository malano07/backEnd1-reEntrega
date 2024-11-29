const Product = require('../models/Product');

class ProductManager {
    
    async getProducts(filter = {}, options = {}) {
        return await Product.paginate(filter, options);
    }

    
    async getProductById(pid) {
        const product = await Product.findById(pid);
        if (!product) throw new Error('Producto no encontrado');
        return product;
    }

  
    async createProduct(data) {
        return await Product.create(data);
    }

    
    async updateProduct(pid, data) {
        const updatedProduct = await Product.findByIdAndUpdate(pid, data, { new: true });
        if (!updatedProduct) throw new Error('Producto no encontrado');
        return updatedProduct;
    }

    
    async deleteProduct(pid) {
        const deletedProduct = await Product.findByIdAndDelete(pid);
        if (!deletedProduct) throw new Error('Producto no encontrado');
        return deletedProduct;
    }
}

module.exports = new ProductManager();
