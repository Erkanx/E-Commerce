const { config } = require('dotenv');
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv/config');

const api = process.env.API_URL;

//Middleware
app.use(express.json());
app.use(morgan('tiny'));

//Routers
const categoriesRoutes = require('./routers/categories');
const productsRoutes = require('./routers/products');
const usersRoutes = require('./routers/users');
const ordersRoutes = require('./routers/orders');


app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);


mongoose.connect(process.env.CONNECTION_STRING).then(() => {
    console.log('Database Connection is ready....')
}).catch((err)=> {
    console.log(err);
})

app.listen(3000, ()=>{
    console.log('Server is running http://localhost:3000');
})