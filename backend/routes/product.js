const express = require('express');
const router = express.Router();

const userHandler = require('../controllers/user');
const authHandler = require('./../controllers/auth');
const categoryHandler = require('../controllers/category');

const productHandler = require('../controllers/product');