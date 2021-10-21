const express = require('express');
const routes = require('./routes');
// import sequelize connection
const Sequelize = requir('sequelize');

const sequelize = new Sequelize(
  //DB Name
  'ecommerce_db',
  //User
  'root',
  //Password
  'root1234',
  {
    //Db Location
    host: 'localhost',
    dialect: 'mysql',
    port: 3001
  }
);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

module.exports = sequelize;
