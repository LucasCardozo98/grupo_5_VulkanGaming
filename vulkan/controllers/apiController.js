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

          
    },
    pagar: (req,res)=>{
        const {idFormaDePago,idUser,idProduct,cantidad,precio} = req.body
        db.Product.findByPk(idProduct)
        .then(product=>{
            if(product.stock >= cantidad){

                let carrito = db.Cart.create({
                    idUser: +idUser,
                    idProduct : idProduct,
                    cantidad : cantidad,
                    precio: +precio,
                    idFormaDePago: +idFormaDePago
                })
                
                let stock  =  db.Product.update({
                        stock : product.stock - cantidad
                    },{
                        where: {
                            id: idProduct
                        }
                    })
                   
                Promise.all([carrito,stock])
                .then(([carrito,stock])=>{
                    dato = [carrito,stock]
                    res.status(200).json({
                        data: dato,
                        mensaje: "exitoso"
                        
                    })

                })      
                .catch(error=>{
                    res.json({
                        mensaje: "error",
                        data: error
                    })
                })

            }else{
                res.json({
                    mensaje: "no hay stock del producto",
                    data: product
                })
            }
        })
        .catch(error=>{
            console.log(error);
        })
       
       
    },
    informacion : (req,res)=>{
        let productos = db.Product.findAll({
            where: {
                visible: 1
            },
            include: [{association: "carrito"}]
        })
        let usuarios = db.User.findAll({
            include: [{association: "carrito"}]
        })
        let carrito = db.Cart.findAll()
        
        let marcas = db.Brand.findAll({
            include: [{association: "marcas"}]
        })
        let categorias = db.Category.findAll({
            include: [{association: "categorias"}]
        })
        Promise.all([productos,usuarios,carrito,marcas,categorias])
        .then(([productos,usuarios,carrito,marcas,categorias])=>{
            const data = {
                productos,
                usuarios,
                carrito,
                marcas,
                categorias
            }
            res.json(data);
        })
        .catch(error=>{
            res.json(error)
        })

    },
    email : (req,res)=>{
        let mails = []
        db.User.findAll()
        .then(users=>{
            users.forEach(element => {
                mails.push(element.email);
            });
            res.json({
                mails
            })
        })
        .catch(error=>{
            console.log(error)
        })
    }
 
}
    
