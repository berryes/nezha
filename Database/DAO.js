const DAO = () => {
    const Sequelize = require("sequelize");
    require("dotenv").config();
  
    const database = new Sequelize({
        dialect: 'sqlite',
        logging: false,
        storage: './database.sqlite'
      });
    return database;
  };
  module.exports = DAO;