const {check, body} = require('express-validator');

module.exports = [
    check('email').isEmail().withMessage('el email es requerido'),
    check('password').notEmpty().withMessage('La contraseña es requerida'),
]
