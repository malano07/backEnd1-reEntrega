const mongoose = require('mongoose');
const Product = require('./models/Product'); 


mongoose.connect('mongodb+srv://maximalano:WJUr2avlZvCstFqb@cluster0.bfb0g.mongodb.net/backendfinal?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Conectado a MongoDB');
    })
    .catch((error) => {
        console.error('Error conectando a MongoDB:', error);
        process.exit(1);
    });


const products = [
    { title: "Camiseta Básica", description: "Camiseta de algodón", code: "CAM001", price: 19.99, status: true, stock: 50, category: "Ropa", thumbnails: ["https://example.com/camiseta1.jpg"] },
    { title: "Pantalón Deportivo", description: "Pantalón para entrenamiento", code: "PAN001", price: 29.99, status: true, stock: 30, category: "Ropa", thumbnails: ["https://example.com/pantalon1.jpg"] },
    { title: "Zapatos de Running", description: "Zapatos para correr", code: "ZAP001", price: 49.99, status: true, stock: 20, category: "Calzado", thumbnails: ["https://example.com/zapatos1.jpg"] },
    { title: "Gorra Deportiva", description: "Gorra para protección solar", code: "GOR001", price: 14.99, status: true, stock: 100, category: "Accesorios", thumbnails: ["https://example.com/gorra1.jpg"] },
    { title: "Camiseta Técnica", description: "Camiseta de poliéster transpirable", code: "CAM002", price: 24.99, status: true, stock: 40, category: "Ropa", thumbnails: ["https://example.com/camiseta2.jpg"] },
    { title: "Shorts Deportivos", description: "Shorts ligeros para correr", code: "SHO001", price: 19.99, status: true, stock: 25, category: "Ropa", thumbnails: ["https://example.com/shorts1.jpg"] },
    { title: "Botella de Agua", description: "Botella de agua reutilizable", code: "BOT001", price: 9.99, status: true, stock: 150, category: "Accesorios", thumbnails: ["https://example.com/botella1.jpg"] },
    { title: "Sudadera con Capucha", description: "Sudadera de algodón", code: "SUD001", price: 39.99, status: true, stock: 35, category: "Ropa", thumbnails: ["https://example.com/sudadera1.jpg"] },
    { title: "Calcetines Deportivos", description: "Calcetines de alta absorción", code: "CAL001", price: 5.99, status: true, stock: 200, category: "Accesorios", thumbnails: ["https://example.com/calcetines1.jpg"] },
    { title: "Mochila Deportiva", description: "Mochila para gimnasio", code: "MOC001", price: 29.99, status: true, stock: 20, category: "Accesorios", thumbnails: ["https://example.com/mochila1.jpg"] }
    // Agrega más productos aquí si lo deseas
];


const seedProducts = async () => {
    try {
        await Product.insertMany(products);
        console.log('Productos agregados correctamente');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error insertando productos:', error);
        mongoose.connection.close();
    }
};

seedProducts();
