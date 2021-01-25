
'use strict';

const bcrypt = require('bcryptjs');

const users = require('../models/users.model');
const responses = require('../helpers/response');
const jwt = require('../helpers/jwt');

module.exports = {
    cback_findUser: async(req, res)=>{
        try {
            const result = await users.findAll();
            return responses(res, 200, result, false);
        } catch (error) {
            console.log(error);
            return responses(res, 500, error, false);
        }
    },
    cback_createUser: async(req, res)=>{
        try {
            const { user, password, ...data } = req.body;
            
            const exists = await users.findOne({
                where:{ user }
            });
            
            if(exists) return responses(res, 400, `Ya existe`, true);

            const salt = bcrypt.genSaltSync();
            data.user = user;
            data.password = bcrypt.hashSync(password, salt);
            
            const info = await users.create(data);

            const token = await jwt(info.id);
            return responses(res, 200, {info, token}, false);

        } catch (error) {
            console.log(error);
            return responses(res, 500, error, false);
        }
    },
    cback_updateUser: async(req, res)=>{
        try {
            const { id } = req.query;
            const { user, role } = req.body;

            const [exists, checkid] = await Promise.all([
                users.findOne({
                    where:{ user }
                }),
                users.findOne({
                    where:{ id }
                })
            ]);
            
            if(!checkid) return responses(res, 400, `El user no existe`, true);
            if(exists && user !== checkid.user) return responses(res, 400, `Ya existe ese user`, true);

            const result = await users.update({ user, role }, { where:{ id } });

            return responses(res, 200, result, false);

        } catch (error) {
            console.log(error);
            return responses(res, 500, error, false);
        }
    },
    cback_deleteUser: async(req, res)=>{
        try {
            const { id } = req.query;

            const exists = await users.findOne({
                where:{ id }
            });
            
            if(!exists) return responses(res, 400, `No existe`, true);

            const result = await users.destroy({
                where:{ id }
            });

            return responses(res, 200, result, false);
        } catch (error) {
            console.log(error);
            return responses(res, 500, error, false);
        }
    }
};
