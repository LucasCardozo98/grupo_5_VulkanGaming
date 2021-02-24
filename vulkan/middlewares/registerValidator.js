const fs = require('fs');
const {check, body} = require('express-validator');
const users_db = JSON.parse(fs.readFileSync('./data/users.json','utf-8'));

module.exports = [
    check('email')
    .notEmpty().whitMessage('el email es requerido'),

    check('email')
    .isEmail().whitMessage('debe ser un email valido'),

    body('email').custom(value=>{
        let result = users_db.find(user => user.email === value);

        if (result) {
            return false
        } else {
            return true
        }
    }).whitMessage('El email esta registrado'),

    check('adress')
    .isLength({
        min : 6,
        max : 12
    }).whitMessage('las contrasenias no coinciden'),

    check('adress2').custom((value, {req}) => {
        if (value !== req.body.adress) {
            return false
        } else {
            return true
        }
    }).whitMessage('las contrasenias no coinciden')
    
]