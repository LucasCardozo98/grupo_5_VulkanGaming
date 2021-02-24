const fs = require('fs');
const {check, body} = require('express-validator');
const users_db = JSON.parse(fs.readFileSync('./data/users.json','utf-8'));

module.exports = [
    check('email').notEmpty().withMessage('el email es requerido'),

    check('email').isEmail().withMessage('debe ser un email valido'),

    body('email').custom(value=>{
        let result = users_db.find(user => user.email === value);

        if (result) {
            return false
        } else {
            return true
        }
    }).withMessage('El email ya esta registrado'),

    check('adress').isLength({
        min : 6,
        max : 12
    }).withMessage('La constrasenia tiene que tener 6 caracteres como minimo y 12 como maximo. ATT Vulkan Gaming'),

    check('adress2').custom((value, {req}) => {
        if (value !== req.body.adress) {
            return false
        } else {
            return true
        }
    }).withMessage('las contrasenias no coinciden')
    
]