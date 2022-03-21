// post.routes.js

const express = require('express');
const router = express.Router();
const ProductController = require('./../controllers/products.controller.js');


router.get('/products', ProductController.getAll);

router.get('/products/random', ProductController.getRandom);

router.get('/products/:id', ProductController.getById);

router.post('/products', ProductController.postItem);

router.put('/products/:id', ProductController.putItem);

router.delete('/products/:id', ProductController.deleteItem);

module.exports = router;
