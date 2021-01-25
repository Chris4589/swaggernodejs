'use strict';

const { Sequelize } = require('sequelize');

const db = require('../configs/db');

module.exports = db.define('users', {
    id:{
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        required: true
    },
    user:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        required: true
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        required: true
    },
    role:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'USER_ROLE',
        unique: false
    }
}, {
    paranoid: true,
    underscored: true,
    timestamps: true,
    freezeTableName: true,
    tableName: 'users'
});