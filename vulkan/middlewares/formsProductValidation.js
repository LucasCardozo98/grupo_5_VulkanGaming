const {check,body} = require('express-validator');

module.exports = [
    check("name").notEmpty().withMessage("El campo nombre es requerido"),
    check("category").notEmpty().withMessage("La categoria es requerida"),
    check("brand").notEmpty().withMessage("La marca es requerida"),
    body("price").custom((value)=>{
        if(value > 0){
            return true
        }else{
            return false
        }
    }).withMessage("El precio debe ser mayor a cero"),
    check("description").notEmpty().withMessage("La descripcion es requerida"),
    body("stock").custom((value)=>{
        if(value >= 0){
            return true
        }else{
            return false
        }
    }).withMessage("El stock debe ser mayor o igual a cero"),

]