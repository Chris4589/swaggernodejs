'use strict';

const { Sequelize } = require("sequelize");
require('dotenv').config();

const { DB_NAME, DB_USER, DB_PASS, DB_PORT, DB_HOST } = process.env;

module.exports = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    port: DB_PORT,
    host: DB_HOST,
    dialect: 'mysql',
    define:{
        timestamps: false
    },
    pool:{
        min: 0,
        max:5,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: false
});

