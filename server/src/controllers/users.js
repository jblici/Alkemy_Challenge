const {User} = require('../db');

// This function helps us get all the users excluding the password attribute.
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

// This function helps us to get all the information about one user in particular.
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