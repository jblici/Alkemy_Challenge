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
    try {
        const {id} = req.params
        const user = await getUserById(id);
        res.send(user);
    } catch (err) {
        res.send(err)
    }
}

module.exports = {getAllUsers, getUser}