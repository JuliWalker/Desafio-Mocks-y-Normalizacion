const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 8080
import routesProducts from './routes/products'
// import routesCart from './routes/cart'


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos',routesProducts)
// app.use('/api/carrito',routesCart)

try {
    app.listen(PORT);
    console.log(`Server on port ${PORT}...`)
} catch (error) {
    console.log('Error de conexión con el servidor...', error)
}