const User = require('./../models/user');
const {
	validationResult
} = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

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

exports.signin = (req, res) => {
	const {
		email,
		password
	} = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array()[0].msg,
		});
	}

	User.findOne({
			email,
		},
		(err, user) => {
			if (err || !user) {
				return res.status(400).json({
					error: 'USER email does not exists',
				});
			}
			if (!user.autheticate(password)) {
				return res.status(401).json({
					error: 'Email and password do not match',
				});
			}
			const token = jwt.sign({
					_id: user._id,
				},
				process.env.SECRET
			);
			//put token in cookie
			res.cookie('token', token, {
				expire: new Date() + 9999,
			});

			//send response to front end
			const {
				_id,
				name,
				email,
				role
			} = user;
			return res.json({
				token,
				user: {
					_id,
					name,
					email,
					role,
				},
			});
		}
	);
};

exports.signout = (req, res) => {
	res.clearCookie('token');
	res.json({
		message: 'User signout successfully',
	});
};

//Protected routes
//isSignedIn requires Bearer value(token)
exports.isSignedIn = expressJwt({
	secret: process.env.SECRET,
	algorithms: ['HS256'],
	userProperty: 'auth', //contains _id received by Bearer value which is token generated
});

// custom middlewares
exports.isAuthenticated = (req, res, next) => {
	//profile is from frontend auth is from isSignedIm id will be in auth as well as profile
	let checker = req.profile && req.auth && req.profile._id == req.auth._id; //== not === because of object
	if (!checker) { //== used to compare object values === doesnot work on object
		return res.status(404).json({
			error: 'Access denied not authenticated',
		});
	}
	next();
};

exports.isAdmin = (req, res, next) => {
	if (req.profile.role === 0) {
		return res.status(403).json({
			error: 'your not an Admin',
		});
	}
	next();
};