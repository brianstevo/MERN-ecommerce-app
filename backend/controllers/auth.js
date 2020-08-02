const User = require('./../models/user');
const { validationResult } = require('express-validator');

exports.signout = (req, res) => {
	res.json({
		status: 'success',
	});
};

exports.signup = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array()[0].msg,
		});
	}
	try {
		const newUser = await User.create(req.body);
		res.status(201).json({
			status: 'success',
			data: {
				tour: newUser,
			},
		});
	} catch (err) {
		res.status(404).json({
			status: 'unsuccessful',
			message: 'not able to save into DB (value may be unqiue)',
			error: err,
		});
	}
};
