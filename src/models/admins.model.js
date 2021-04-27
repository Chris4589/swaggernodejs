'use strict';

const { Sequelize } = require('sequelize');

const { Connection } = require('../configs/db');

class ModelAdmin extends Connection {
    constructor() {
        super();

        this.model = this.connection.define('admins', {
            id: {
                primaryKey: true,
                type: Sequelize.INTEGER,
                unique: true,
                autoIncrement: true,
                required: true
            },
            authid: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                required: true
            },
            password: {
                type: Sequelize.STRING,
                allowNull: true,
                unique: false,
                required: true
            },
            role: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 'ADMIN',
                unique: false
            },
            flags: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: false
            }
        }, {
            paranoid: true,
            underscored: true,
            timestamps: true,
            freezeTableName: true,
            tableName: 'admins'
        });
    }
}

module.exports = { ModelAdmin };
