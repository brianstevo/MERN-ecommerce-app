const User = require('../models/user');
const {
    Order
} = require('../models/order');

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'No user was found in DB',
            });
        }
        req.profile = user;
    });
    next();
};

exports.getUser = (req, res) => {
    //hide salt and password
    //undefined values dont show up
    req.profile.salt = undefined;
    req.profile.encrypt_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile); //received by getUserById
};

// exports.getAllUser = async (req, res) => {
// 	try {
// 		const allUsers = await User.find(); //find returns a promisee use async await or exec() to handle it
// 		res.status(400).json({
// 			status: 'success',
// 			data: allUsers,
// 		});
// 	} catch (err) {
// 		return res.status(400).json({
// 			error: 'No users found in DB',
// 		});
// 	}
// };
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.profile._id, req.body, {
            new: true,
            useFindAndModify: false,
            runValidators: true
        })
        user.salt = undefined;
        user.encrypt_password = undefined;
        res.status(200).json({
            status: 'success',
            data: user,
        });
    } catch (err) {
        return res.status(404).json({
            message: 'Not authorized to update',
            error: err
        });

    }
};

exports.userPurchaseList = (req, res) => {
    Order.find({
            user: req.profile._id
        })
        .populate("user", "_id name")
        .exec((err, order) => {
            if (err) {
                return res.status(404).json({
                    message: 'no orders in this account',
                    error: err
                });
            }
            return res.json(order);
        })
}

exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchases = [];
    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        });
    });
    //store thi in DB
    User.findOneAndUpdate({
            _id: req.profile._id
        }, {
            $push: {
                purchases: purchases
            }
        }, {
            new: true
        },
        (err, purchases) => {
            if (err) {
                return res.status(400).json({
                    error: "Unable to save purchase list"
                });
            }
            next();
        }
    );
};