const User = require('./../models/user');
const {
    validationResult
} = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

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
        email
    }, (err, user) => {
        if (err) {
            res.status(400).json({
                error: "USER email does not exists"
            });
        }
        if (!user.autheticate(password)) {
            return res.status(401).json({
                error: "Email and password do not match"
            });
        }
        const token = jwt.sign({
            _id: user._id
        }, process.env.SECRET);
        //put token in cookie
        res.cookie("token", token, {
            expire: new Date() + 9999
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
                role
            }
        });

    })


    res.json({
        status: 'success',
    });
};