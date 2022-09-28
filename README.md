# backEndBolsa

Create File:

Name: .sequelizerc
Content: 
const path = require("path");

module.exports = {
  config: path.resolve("src", "database", "config.json"),
  "models-path": path.resolve("src", "app", "models"),
  "seeders-path": path.resolve("src", "database", "seeders"),
  "migrations-path": path.resolve("src", "database", "migrations"),
};
