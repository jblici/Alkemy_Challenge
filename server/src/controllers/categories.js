const {Category} = require('../db');

async function getAllCategories(req,res,next) {
    try {
        const categories = await Category.findAll()
        res.status(200).json(categories)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong" })
    }
    
}

async function getCategory (req, res, next) {
    const { id } = req.params;
    try {
        const category = Category.findByPk(id);
        res.status(200).json(category)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong" })
    }
}

module.exports = {getAllCategories, getCategory}