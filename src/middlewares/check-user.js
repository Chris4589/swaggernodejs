'use strict';

const responses = require('../helpers/response');
const users = require('../models/users.model');

module.exports = async (req, res, next) => {
    try {
        const { uid } = req;
        
        const userType = await users.findOne({
            where:{ id:uid }
        });

        if(!userType)
            return responses(res, 400, `Usuario no existente`, true);
        
        if(userType.role !== process.env.ADMIN_ROLE)
            return responses(res, 403, `User no autorizado`, true);

        next();

    } catch (error) {
        console.log(error);
        return responses(res, 500, `Error en el servidor`, true);
    }
}