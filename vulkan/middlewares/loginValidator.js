const {check, body} = require('express-validator');
const db = require("../database/models");

module.exports = [
    check('email').notEmpty().withMessage('El email es requerido'),
    check('email').isEmail().withMessage('Debe ser un Email valido'),
    check('password').notEmpty().withMessage('La contraseña es requerida'),
]
