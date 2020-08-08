const express = require('express');
const router = express.Router();

const userHandler = require('../controllers/user');
const authHandler = require('./../controllers/auth');
const productHandler = require('../controllers/product');


router.param("userId", userHandler.getUserById); //param userId should be matching with :userId otherwise middleware getUserById wont trigger
router.param("productId", productHandler.getProductById);

router.get("/product/:productId", productHandler.getProduct);
router.get("/products", productHandler.getAllProducts);

//to load photo behind the scenes (async **)optimization
router.get("/product/photo/:productId", productHandler.photo);

router.post("/product/create/:userId", authHandler.isSignedIn, authHandler.isAuthenticated, authHandler.isAdmin, productHandler.createProduct);

router.delete("/product/:productId/:userId", authHandler.isSignedIn, authHandler.isAuthenticated, authHandler.isAdmin, productHandler.deleteProduct);

router.put("/product/:productId/:userId", authHandler.isSignedIn, authHandler.isAuthenticated, authHandler.isAdmin, productHandler.updateProduct);

module.exports = router;