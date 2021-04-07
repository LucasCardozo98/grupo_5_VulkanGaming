const fs = require("fs");
const path = require("path");
const {validationResult} = require("express-validator");
const db = require("../database/models");
const Op = require("sequelize");
const mercadopago = require("mercadopago");
module.exports =  {
    //aca empieza la muestra de productos de diferentes categorias
    mostrar: (req,res) =>{ 
        db.Category.findAll({
            include: [{association: "categorias"}]
        }) 
        .then(categorias=>{
            res.render("products",{css:'/stylesheets/products.css',categorias});
        })
        .catch(error=>{
            console.log(error)
        })
    },
    showCategory: (req,res)=>{
        const categoria = req.params.categoria;
       let products = db.Product.findAll({
            where: {
                [db.Sequelize.Op.and]: [{idCategory: categoria},{visible: 1}]
            }
        })
        let category = db.Category.findByPk(categoria)
        Promise.all([products,category])
        .then(([products,category])=>{
           
            res.render("category",{css:"/stylesheets/productsCategory.css", products, category});

        })
        .catch(error=>{
            res.send(error);
        })
        /*const productsCategory = products.filter(product => product.category == category)
        res.render("category",{css:"/stylesheets/productsCategory.css",productsCategory, category});*/
    },
    storeProduct: (req,res)=>{
        const {name,category,brand,price,stock,description} = req.body
        let errors = validationResult(req);
        let product;
        if(errors.isEmpty()){
            if(req.files[0]){
            db.Product.create({
                name: name,
                idCategory : category,
                idBrand : brand,
                price : price,
                description: description, 
                image: req.files[0].filename,    
                stock: stock          
            })
            .then(()=>{
                res.redirect("/products/list");
            })
            .catch(error=>{
                res.send(error);
            })
        }else{
            db.Product.create({
                name: name,
                idCategory : category,
                idBrand : brand,
                price : price,
                description: description,
                stock: stock              
            })
            .then(()=>{
                res.redirect("/products/list");
            })
            .catch(error=>{
                res.send(error);
            })
        }
        }
        else{
        let categorias = db.Category.findAll();
        let marcas = db.Brand.findAll()


        Promise.all([categorias,marcas])
        .then(([categorias,marcas])=>{
            res.render("productCreate",{css:'/stylesheets/admin.css', categorias, marcas, errors : errors.errors});
        })
        .catch(error=>{
            res.send(error);
        })
            
        }
                              
    },
    cart : (req,res) =>{  
        /*const userId = req.params.id
        db.User.findByPk(userId,{
            include : [{association: "carrito"}]
        })
        .then(user=>{
            res.render("carrito",{css:'/stylesheets/carrito.css',user});
        })
        .catch(error=>{
            res.send(error);
        })*/
        res.render("carrito",{css: "/stylesheets/carrito.css"});
        
    },
    productDetail: (req,res)=>{
        const id = req.params.id
        db.Product.findByPk(id,{
            where: {visible: 1},
            include: [{association: "categorias"},{association: "marcas"}]
        })
        .then(product=>{
            res.render("detail",{css:'/stylesheets/index.css',product})
        })
        .catch(error=>{
            res.send(error);
        })

    },
    crearProducto : (req,res)=>{
        let categorias = db.Category.findAll();
        let marcas = db.Brand.findAll();


        Promise.all([categorias,marcas])
        .then(([categorias,marcas])=>{
            res.render("productCreate",{css:'/stylesheets/admin.css', categorias, marcas});
        })
        .catch(error=>{
            res.send(error);
        })
    },
    showEdit: (req,res)=>{
        const id = req.params.id
        let product = db.Product.findByPk(id,{
            where:{visible: 1},
            include: [{association: "categorias"},{association: "marcas"}]
        })
        let categorias = db.Category.findAll();
        let marcas = db.Brand.findAll()
        Promise.all([product,categorias,marcas])
        .then(([product,categorias,marcas])=>{
            res.render("productEdit",{css:'/stylesheets/admin.css', product,categorias,marcas })
        })
        .catch(error=>{
            res.send(error);
        })
        
    },
    edit: (req,res, next)=>{
        let id = req.params.id
        const {name,category,brand,price,description,stock} = req.body
        const errors = validationResult(req);
        let imagen;
        if(req.files[0]){
            db.Product.findByPk(id)
            .then(element=>{
                if(fs.existsSync(path.join('public','images',element.image))){

                fs.unlinkSync(path.join('public','images',element.image))

                }
            })
            imagen = req.files[0].filename
                
            
        }
        else{
            db.Product.findByPk(id)
            .then(element=>{
                if(element.image != null){
                    imagen = element.image
                }else{
                    imagen = null
                }
                
            })
            
        }

        if(errors.isEmpty()){
            db.Product.update({
                name: name,
                idCategory : category,
                idBrand : brand,
                price : price,
                description: description,
                image : imagen,
                stock : stock
            },
            {
                where: {
                    id : id
                }
            })
            .then(()=>{
                res.redirect(`/products/detail/${id}`)
                
            })
            .catch(error=>{
                res.send(error +2);
            })
        
    
        }
        else{
            const product= db.Product.findByPk(id,{
                where: {visible: 1}
            })
            const categorias= db.Category.findAll()
            const marcas= db.Brand.findAll()
            Promise.all([product,categorias,marcas])
            .then(([product,categorias,marcas])=>{
                res.render("productEdit",{css:'/stylesheets/admin.css', product, categorias,marcas,errors: errors.errors});
                next()
            })
            .catch(error=>{
                res.send(error + 1);
            })
        }
        
    },
    delete: (req,res)=>{
        let id = req.params.id
        db.Product.update({
            visible: 2},
            {where: {id: id}
        
            
            
        })
        .then(resultado=>{
            res.redirect("/products/list")})
        .catch(error=>{
            res.send(error);
        })
        
    },
    adminList: (req,res)=>{
        let products = db.Product.findAll({
            where: {visible: 1}
        })
        let categorys = db.Category.findAll()
        let brands = db.Brand.findAll()
        Promise.all([products,categorys,brands])
        .then(([products,categorys,brands])=>{
            res.render("productsAll", {css:"/stylesheets/productsCategory.css",products,categorys,brands})
        })
        .catch(error=>{
            res.send(error)
        })
        
    },
    crearCarrito: (req,res)=>{
        const idProduct = req.params.idProduct;
        const idUser = req.params.idUser;
        
        db.Cart.create({
            idUser: +idUser,
            idProduct : +idProduct
        })
        .then(()=>{
            res.redirect("/products")
        })
        .catch(error=>{
            res.send(error);
        })
    },
    eliminarProductoCarrito : (req,res)=>{
        const idProducto = req.params.idProduct
        const idUser = req.params.idUser
        db.Cart.destroy({
            where:{
                idProduct: idProducto,
                idUser : idUser
            }
        })
        .then(res.redirect("/"))
        .catch(error=>{
            res.send(error);
        })
    },
    buscador: (req,res)=>{
        let busqueda = req.query.busqueda.trim()
        let products=  db.Product.findAll(
            {
                include: [{association: "marcas"},{association: "categorias"}],
            
            
                where : {
                    name : {[db.Sequelize.Op.like]: `%${busqueda}%`},
                    visible: 1 //ver si funciona
                    
                }
            }
           
            
        )
        let brand = db.Brand.findOne({
            include: [{association: "marcas"}],
            
            
                where : {
                    name : {[db.Sequelize.Op.like]: `${busqueda}%`}
                    
                }
        })
        let category = db.Category.findOne({
            include: [{association: "categorias"}],
            
            
                where : {
                    name : {[db.Sequelize.Op.like]: `${busqueda}%`}
                    
                }
        })
        Promise.all([products,brand,category])
        .then(([products,brand,category])=>{
            console.log(products,brand,category)
            if(products!= null && products.length > 0){
                res.render("resultado",{css: "/stylesheets/buscador.css", products})
            }
            else if (brand != null){
                res.render("resultado",{css: "/stylesheets/buscador.css", brand})
            }
            else if (category != null){
                res.render("resultado",{css: "/stylesheets/buscador.css", category})
            }
            else if (category == null && brand == null && products[0]== null){
                res.render("sinResultados",{css: "/stylesheets/buscador.css"})
            }
            
        })
        .catch(error=>{
            res.send(error + "1");
        })
        
        
},
    filtrado: (req,res)=>{
        const categoria = req.query.categoria
        const marca = req.query.marca
        switch(true){
            case categoria == "no filtrar":
                db.Product.findAll({
                    include: [{association: "marcas"},{association: "categorias"}],
                    where: {
                        idBrand: marca,
                        visible: 1
                    }
                })
                .then(products=>{
                    if(products != null && products.length > 0){
                        res.render("resultado",{products, css: "/stylesheets/buscador.css"})
                  
                    }else{
                        res.render("sinResultados",{css: "/stylesheets/buscador.css"})
                    }
                })
                .catch(error=>{
                    res.send(error +"1")
                })
                break;
            case marca == "no filtrar":
                db.Product.findAll({
                    include: [{association: "marcas"},{association: "categorias"}],
                    where: {
                        idCategory: categoria,
                        visible: 1
                    }
                })
                .then(products=>{
                    if(products != null && products.length > 0){
                        res.render("resultado",{products, css: "/stylesheets/buscador.css"})
                  
                    }else{
                        res.render("sinResultados",{css: "/stylesheets/buscador.css"})
                    }
                })
                .catch(error=>{
                    res.send(error +"2")
                })
                break;
            case marca != "no filtrar" && categoria != "no filtrar":
                db.Product.findAll({
                    include: [{association: "marcas"},{association: "categorias"}],
                    where: {
                        idBrand : marca,
                        idCategory : categoria,
                        visible: 1
                    }
                })
                .then(products=>{
                    if(products != null && products.length > 0){
                        res.render("resultado",{products, css: "/stylesheets/buscador.css"})
                  
                    }else{
                        res.render("sinResultados",{css: "/stylesheets/buscador.css"})
                    }
                    console.log(typeof products + "    ESTOS ES EL CONSOLE LOGO A VER QUE DAAA AH RE")
                })
                .catch(error=>{
                    res.send(error + "3");
                })
        }
    },
    mercadoPago : (req,res)=>{
        /*let id = req.params.id
        let productos = []
        mercadopago.configure({
            access_token: 'TEST-4012676185241188-030723-fa1ad01a11e65236862b4f2e58e27d9f-146686887'
        });
        db.User.findByPk(id,{
            include: [{association: "carrito"}]
        })
        .then(products =>{
            products.carrito.forEach(element => {
                let producto = {
                    title: element.name,
                    unit_price : element.price,
                    quantity: 1
                }
                console.log( "esto es producto  " +producto[0] );
                productos.push(producto);
            });
            let preference = {
                items : productos
            }
            mercadopago.preferences.create(preference)
            .then((respuesta)=>{
                res.redirect(respuesta.body.init_point);
                console.log(respuesta)
            })
            .catch(error=>{
                console.log(error +"  MERCADO PAGO");
            })
        })
        .catch(error=>{
            res.send(error + "2");
        })*/
        const productos = req.body;
        console.log(productos)
        mercadopago.configure({
            access_token: 'TEST-4012676185241188-030723-fa1ad01a11e65236862b4f2e58e27d9f-146686887'
        });
        let preference = {
            items : productos
        }
        mercadopago.preferences.create(preference)
            .then((respuesta)=>{
                console.log(respuesta);
               res.json({
                   data: respuesta.response.init_point});
                
            })
            
            .catch(error=>{
                console.log(error +"MERCADO PAGO");
            })
        
        
    },
    pagar: (req,res)=>{
        res.render("pagar",{css: "/stylesheets/carrito.css"});
    }
}