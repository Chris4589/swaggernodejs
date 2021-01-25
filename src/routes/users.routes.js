const { Router } = require('express');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({ passError: true });

const jwt_validator = require('../middlewares/verifity-jwt');
const userole = require('../middlewares/check-user');

const { cback_createUser, cback_deleteUser, cback_findUser, cback_updateUser } = require('../controllers/users.controllers');
const router = Router();

module.exports = () => {

    router.get('/users/', [
        
    ], cback_findUser);

    router.post('/users/', [
            validator.body(
                Joi.object({
                    user:Joi.string().required().not().empty(),
                    password:Joi.string().required().not().empty()
                })
            )
        ],
        cback_createUser);
            
    router.put('/users/', [
            jwt_validator,
            validator.query(
                Joi.object({
                    id: Joi.number().required().not().empty()
                })
            ),
            validator.body(
                Joi.object({
                    user:Joi.string().required().not().empty(),
                    role:Joi.string().required().not().empty()
                })
            )
        ],
        cback_updateUser);

    router.delete('/users/', [
            jwt_validator,
            userole,
            validator.query(
                Joi.object({
                    id: Joi.number().required().not().empty()
                })
            )
        ],
        cback_deleteUser);


    return router;
}