const mongoose = require('mongoose');
const crypto = require('crypto');
const {
	v1: uuidv1
} = require('uuid');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		maxlength: 32,
		trim: true,
	},
	lastname: {
		type: String,
		maxlength: 32,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	userinfo: {
		type: String,
		trim: true,
	},
	encrypt_password: {
		type: String,
		required: true,
	},
	salt: String,
	role: {
		type: Number,
		default: 0,
	},
	purchases: {
		type: Array,
		default: [],
	},
}, {
	timestamps: true
});

userSchema
	.virtual('password')
	.set(function (password) {
		this._password = password;
		this.salt = uuidv1();
		this.encrypt_password = securePassword(password);
	})
	.get(function () {
		return this._password;
	});

userSchema.method = {
	autheticate: function (plainpassword) {
		return this.securePassword(plainpassword) === this.encrypt_password;
	},

	securePassword: function (plainpassword) {
		if (!password) return '';
		try {
			return crypto
				.createHmac('sha256', this.salt)
				.update(plainpassword)
				.digest('hex');
		} catch (err) {
			return '';
		}
	},
};

const User = mongoose.model('User', userSchema);
module.exports = User;