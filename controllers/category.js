const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
	Category.findById(id).exec((err, category) => {
		if (err || !category) {
			return res.status(400).json({
				error: "Category not found in DB",
			});
		}
		req.category = category;
		next();
	});
};

exports.createCategory = async (req, res) => {
	try {
		const category = await Category.create(req.body);
		res.status(201).json(category);
	} catch (err) {
		res.status(400).json({
			error: "not able to save in DB",
		});
	}
};

// exports.getAllCategory = (req, res) => {
// 	Category.find().exec((err, categories) => {
// 		if (err) {
// 			return res.status(400).json({
// 				error: "NO categories found",
// 			});
// 		}
// 		res.json(categories);
// 	});
// }

exports.getAllCategory = async (req, res) => {
	try {
		const categories = await Category.find(); //find returns a promisee use async await or exec() to handle it
		res.status(200).json(categories);
	} catch (err) {
		return res.status(400).json({
			error: "No Category available",
		});
	}
};

exports.getCategory = (req, res) => {
	return res.json(req.category);
};

// exports.updateCategory = async (req, res) => {
// 	try {
// 		const category = await Category.findByIdAndUpdate(
// 			req.category._id,
// 			req.body,
// 			{
// 				new: true,
// 				useFindAndModify: false,
// 				runValidators: true,
// 			}
// 		);
// 		res.status(200).json({ category });
// 	} catch (err) {
// 		return res.status(404).json({
// 			error: err,
// 		});
// 	}
// };
exports.updateCategory = (req, res) => {
	const category = req.category;
	console.log(req.body.name);
	category.name = req.body.name;

	category.save((err, updatedCategory) => {
		if (err) {
			return res.status(400).json({
				error: "Failed to update category",
			});
		}
		res.json(updatedCategory);
	});
};

exports.deleteCategory = async (req, res) => {
	try {
		await Category.findByIdAndDelete(req.category._id);

		res.status(200).json({
			status: "DELETED successfully",
		});
	} catch (err) {
		return res.status(404).json({
			message: "Not authorized to DELETE",
			error: err,
		});
	}
};
