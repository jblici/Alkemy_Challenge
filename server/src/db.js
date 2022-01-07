require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
    logging: false,
    native: false,
});

const basename = path.basename(__filename);

const modelDefiners = []

//We read all the archives of the Model folder, we require them and add them to an array modelDefines.
fs.readdirSync(path.join(__dirname, '/models'))
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, '/models', file)));
    });

//We inject the conection (sequelize) to all the models
modelDefiners.forEach(model => model(sequelize));
//We capitalize all the names of the models ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// In sequelize models all the models are imported as properties.
// For associations we destructure the models.

const { User, Category, Operation } = sequelize.models;

User.hasMany(Operation)
Operation.belongsTo(User)
Operation.hasOne(Category)
Category.belongsToMany(Operation, {through: 'CategoryOperation'}) 

module.exports = {
    ...sequelize.models,
    conn: sequelize,
}