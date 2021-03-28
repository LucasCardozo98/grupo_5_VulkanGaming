const db = require("../database/models");
const productsController = require("./productsController");
const bcrypt = require('bcrypt');
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
    },
    iniciarSesion: (req,res) =>{
        const {email, password, recordame} = req.body;
            console.log(req.body);
            db.User.findOne({
                where: {
                    email : email
                }
            })
            .then(user=>{
                if(bcrypt.compareSync(password, user.password)){
                    req.session.user = {
                        id : user.id,
                        username : user.username,
                        email: user.email,
                        first_name : user.firstName,
                        avatar : user.avatar,
                        rol: user.rol
                    }
                    if(recordame){
                        res.cookie('userVulkan',req.session.user,{
                            maxAge : 1000 * 60 * 60 * 24
                        })
                    }
                    console.log("SESION INICIADA CON EXITO")
                    res.json({
                        data: "sesión iniciada con exito"
                    })
                }
            })
            .catch(error=>{
                res.json({
                    data: error
                })
                console.log(`este es el error ${error}`);
            })

          
    }
}