const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.json`)[env];
const db = {};

if (process.env.DATABASE_URL) {
  console.log(config)
  var sequelize = new Sequelize(process.env.DATABASE_URL,config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

sequelize.authenticate()
  .then(function () {
    console.log('Connection successful');
  })
  .catch(function(error) {
    console.log("Error creating connection:", error);
  });

fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
