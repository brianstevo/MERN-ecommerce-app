const express = require('express');
const router = express.Router();
const authHandler = require('./../controllers/auth');
const { check } = require('express-validator');

router.post(
	'/signup',
	[
		check('name')
			.isLength({ min: 3 })
			.withMessage('name must be at least 3 chars long'),
		check('email').isEmail().withMessage('email must be at least 5 chars long'),
		check('password')
			.isLength({ min: 5 })
			.withMessage('Password must be at least 5 chars long')
			.matches(/\d/)
			.withMessage('Password must contain a number'),
	],
	authHandler.signup
);
router.route('/signout').get(authHandler.signout);

module.exports = router;
