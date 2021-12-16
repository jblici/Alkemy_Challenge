const server = require('./src/app.js');
const { conn, Category, User } = require('./src/db.js');
const categories = require('./src/seed/categories');
const users = require('./src/seed/users');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, async() => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    await Category.bulkCreate(categories)
    await User.bulkCreate(users)
  });
});
