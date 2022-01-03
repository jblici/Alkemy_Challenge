const {User} = require('../db');

async function getAllUsers(req,res,next) {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password']}
        })
        res.send(users)
    } catch(err) {
        res.send(err)
    }
}

async function getUser (req, res, next) {
    const {id} = req.params
    try {
        const user = await User.findByPk(id, { exclude: ['password']});
        res.send(user);
    } catch (err) {
        res.send(err)
    }
}

module.exports = {getAllUsers, getUser}