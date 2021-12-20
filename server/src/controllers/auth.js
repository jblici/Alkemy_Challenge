const { User } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../auth');

//We recive information from the front end for the validation of user and password. 
//We use the method findOne from sequelize to search for an existing user where the email is the same one that we recived from the body.
//Server respond 404 indicating that User was not found
//Otherwise we compare de password that we recived from the body with the password of the db. This returnes a boolean.
//If the password comparison is incorrect we respond with a 401 were the authentication failed.
//Finally when everything is correct we use the method inside jwt to create the token.
async function signIn(req,res,next) {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email }});
        if(!existingUser) return res.status(404).json({message: "User does not exist"});
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) return res.status(401).json({message: "Password is incorrect"});
        const token = jwt.sign({ existingUser }, authConfig.secret, { expiresIn: authConfig.expires });
        res.status(200).json({ existingUser, token });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong" });
    }
}

//We check if the email provide in the request body does exist. In which case we return with code 400 saying that User already exist, you can sign in or use another email.
//In case that email does not exist in the DB we use the hash method of bcrypt so we can save the user with the hashed password and not the password as it is.
//We create the user.
//We create the token for the sign in.
async function signUp(req,res,next) {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email }});
        if(existingUser) return res.status(400).json({ message: "User already exists" });
        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = await User.create({ email, password: hashedPassword });
        const token = jwt.sign({ user: newUser }, authConfig.secret, { expiresIn: authConfig.expires });
        res.status(200).json({ newUser, token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// In this function we check if the email from google is already in the DB and if thats the case we just create the token with the User found. If the email does not exist we jsut create
// a new one and create the token for the authentication.
async function googleSignIn (req, res, next) {
    const { email, googleId } = req.body
    const user = { email, googleId }
    try {
        const existingUser = await User.findOne({ where: { email }});
        if(existingUser) {
            const updatedUser = await existingUser.update(user);
            const token = jwt.sign({ updatedUser }, authConfig.secret, { expiresIn: authConfig.expiresIn });
            res.status(200).json({ updatedUser, token });
        } else {
            const userCreate = await User.create(user);
            const token = jwt.sign({ userCreate }, authConfig.secret, { expiresIn: authConfig.expiresIn })
            res.status(200).json({ userCreate, token });
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong" });
    }
}

module.exports = { signIn, signUp, googleSignIn }