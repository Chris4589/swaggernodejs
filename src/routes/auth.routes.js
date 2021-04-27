const { Router } = require('express');
const Joi = require('joi');

const router = Router();

const { login, renewToken } = require('../controllers/auth.controller');
const { JoiValidate } = require('../middlewares/JoiValidate');
const validarJWT = require('../middlewares/verifity-jwt');

module.exports = () => {
  router.post('/login/', 
    JoiValidate(
      Joi.object({
        user: Joi.string().required().not().empty(),
        password: Joi.string().required().not().empty()
      }), 'body'), 
    login);

  router.get('/login/renew/', 
    validarJWT, 
    renewToken);

  return router;
}