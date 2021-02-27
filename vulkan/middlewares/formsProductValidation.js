const {check} = require('express-validator');

module.exports = [
    check("name").notEmpty().withMessage("El campo nombre es requerido"),
    check("category").notEmpty().withMessage("La categoria es requerida"),
    check("brand").notEmpty().withMessage("La marca es requerida"),
    check("price").notEmpty().withMessage("El precio es requerido"),
    check("description").notEmpty().withMessage("La descripcion es requerida")

]