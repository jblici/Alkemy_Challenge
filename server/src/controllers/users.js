const {User} = require('../db');

function getAllUsers(req,res,next) {
    return User.findAll({
        attributes: { exclude: ['password']}
    })
    .then((users) => res.send(users))
    .catch((err) => next(err))
}

function getUser (req, res, next) {
    console.log('user id')
}

module.exports = {getAllUsers, getUser}