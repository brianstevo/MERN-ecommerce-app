const express = require('express');
const router = express.Router();

const userHandler = require('../controllers/user');
const authHandler = require('./../controllers/auth');

router.param("userId", userHandler.getUserById); //param userId should be matching with :userId otherwise middleware getUserById wont trigger

router.get('/user/:userId', authHandler.isSignedIn, authHandler.isAuthenticated, userHandler.getUser);
// router.get('/user', userHandler.getAllUser);
router.put('/user/:userId', authHandler.isSignedIn, authHandler.isAuthenticated, userHandler.updateUser);
//patch works too
router.get('/orders/user/:userId', authHandler.isSignedIn, authHandler.isAuthenticated, userHandler.userPurchaseList);

module.exports = router;