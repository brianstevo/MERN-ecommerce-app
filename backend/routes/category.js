const express = require('express');
const router = express.Router();

const userHandler = require('../controllers/user');
const authHandler = require('./../controllers/auth');
const categoryHandler = require('../controllers/category');

router.param("userId", userHandler.getUserById); //param userId should be matching with :userId otherwise middleware getUserById wont trigger
router.param("CategoryId", categoryHandler.getCategoryById);

router.post("/category/create/:userId", authHandler.isSignedIn, authHandler.isAuthenticated, authHandler.isAdmin, categoryHandler.createCategory);
router.get('/category/:CategoryId', categoryHandler.getCategory);
router.get('/category', categoryHandler.getAllCategory);

router.put('/category/:CategoryId/:userId', authHandler.isSignedIn, authHandler.isAuthenticated, authHandler.isAdmin, categoryHandler.updateCategory);
router.delete('/category/:CategoryId/:userId', authHandler.isSignedIn, authHandler.isAuthenticated, authHandler.isAdmin, categoryHandler.deleteCategory);

module.exports = router;