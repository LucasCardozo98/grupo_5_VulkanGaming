const fs = require('fs');
const {check, body} = require('express-validator');
const db = require("../database/models");
const Op = require("sequelize");

module.exports = [
    check('email').notEmpty().withMessage('el email es requerido'),

    check('email').isEmail().withMessage('debe ser un email valido'),

    body('email').custom(value=>{
        //BUSCA EL MAIL EN LA BASE DE DATOS Y SI DA UN RESULTADO
        // NO SE PASA LA VALIDACION
        console.log(`ESTO ES VALUE JAJAJAJ ${value}`)
        let centinela;
       db.User.findAll({
           where: {
               email : value
           }
       })
       .then(users=>{
           users.forEach(element => {
               if(element.email == value){
                   centinela = true;
               }
               
           });
       })
       if(centinela){
        return false
       }
       else{
           return true
       }

    }).withMessage('El email ya esta registrado'),

    check('adress').isLength({
        min : 6,
        max : 12
    }).withMessage('La constraseña tiene que tener 6 caracteres como minimo y 12 como maximo. ATT Vulkan Gaming'),

    body('adress2').custom((value, {req}) => {
        if (value !== req.body.adress) {
            return false
        } else {
            return true
        }
    }).withMessage('las contraseñas no coinciden')
    
]