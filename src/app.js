const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const productsRouter = require('./routers/productsRouter');
const cartsRouter = require('./routers/cartsRouter');
const connectDB = require('./config/db.js'); 

connectDB(); 

const app = express();
app.use(express.json());
const PORT = 8080;
const server = http.createServer(app);
const io = new Server(server);


app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.redirect('/products');
});
app.use('/products', productsRouter);
app.use('/carts', cartsRouter);


io.on('connection', (socket) => {
    console.log('Cliente conectado');
    socket.on('newProduct', async (productData) => {
       
        io.emit('updateProducts', productData);
    });

    socket.on('deleteProduct', async (productId) => {
        
        io.emit('updateProducts', productId);
    });
});


server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
