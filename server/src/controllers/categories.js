const {Category} = require('../db');

function getAllCategories(req,res,next) {
    return Category.findAll()
    .then((categories) => res.send(categories))
    .catch((err) => next(err))
}

function getCategory (req, res, next) {
    console.log('category id')
}

module.exports = {getAllCategories, getCategory}