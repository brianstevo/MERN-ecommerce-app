const Category = require('../models/category');

exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: 'Category not found in DB',
            });
        }
        req.category = category;
        next();
    });
};


exports.createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                category: category
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'unsuccessful',
            error: err,
        });
    }
};
exports.getAllCategory = async (req, res) => {
    try {
        const allCategory = await Category.find(); //find returns a promisee use async await or exec() to handle it
        res.status(200).json({
            status: 'success',
            data: allCategory
        });
    } catch (err) {
        return res.status(400).json({
            error: 'No Category available'
        });
    }
};
exports.getCategory = (req, res) => {
    return res.json(req.category);
};

exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.category._id, req.body, {
            new: true,
            useFindAndModify: false,
            runValidators: true
        })
        res.status(200).json({
            status: 'success',
            data: category,
        });
    } catch (err) {
        return res.status(404).json({
            message: 'Not authorized to update',
            error: err
        });

    }
};


exports.deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.category._id);

        res.status(200).json({
            status: 'DELETED successfully'
        });
    } catch (err) {
        return res.status(404).json({
            message: 'Not authorized to DELETE',
            error: err
        });

    }

}