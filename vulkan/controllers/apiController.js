const db = require("../database/models");
const productsController = require("./productsController");
module.exports = {
    productos: (req,res)=>{
        db.Product .findAll()
        .then(productos=>{
            res.status(200).json({
                data: productos
            })
        })
    },
    producto: (req,res)=>{
        db.Product.findByPk(req.params.id)
        .then(product=>{
            res.status(200).json({
                data: product
            })
        })
    },
    usuarios : (req,res)=>{
        db.User.findAll()
        .then(usuarios=>{
            res.status(200).json({
                data: usuarios
            })
        })
    }
}