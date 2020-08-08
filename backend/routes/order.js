const express = require('express');
const router = express.Router();

const userHandler = require('../controllers/user');
const authHandler = require('./../controllers/auth');
const productHandler = require('../controllers/product');
const orderHandler = require('../controllers/order');

router.param("userId", userHandler.getUserById); //param userId should be matching with :userId otherwise middleware getUserById wont trigger
router.param("orderId", orderHandler.getOrderById);

//create
router.post("/order/create/:userId",
    authHandler.isSignedIn,
    authHandler.isAuthenticated,
    userHandler.pushOrderInPurchaseList,
    productHandler.updateStock,
    orderHandler.createOrder);


//read
router.get(
    "/order/all/:userId",
    authHandler.isSignedIn,
    authHandler.isAuthenticated,
    authHandler.isAdmin,
    orderHandler.getAllOrders
);

router.get(
    "/order/status/:userId",
    authHandler.isSignedIn,
    authHandler.isAuthenticated,
    authHandler.isAdmin,
    orderHandler.getOrderStatus
);
router.put(
    "/order/:orderId/status/:userId",
    authHandler.isSignedIn,
    authHandler.isAuthenticated,
    authHandler.isAdmin,
    orderHandler.updateStatus
);


module.exports = router;