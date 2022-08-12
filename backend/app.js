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

const productScheme = mongoose.Schema({
    name: String,
    image: String,
    countInStock: Number
})

const Product = mongoose.model('Product', productScheme);

app.get(`${api}/products`, async (req, res) => {
    const productList = await Product.find()
    res.send(productList);
})

app.post(`${api}/products`, (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    })
    product.save().then((createdProduct => {
        res.status(201).json(createdProduct)
    })).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

mongoose.connect(process.env.CONNECTION_STRING).then(() => {
    console.log('Database Connection is ready....')
}).catch((err)=> {
    console.log(err);
})

app.listen(3000, ()=>{
    console.log('Server is running http://localhost:3000');
})