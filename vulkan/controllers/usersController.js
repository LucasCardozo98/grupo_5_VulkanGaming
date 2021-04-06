const fs = require("fs");
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const path = require("path");
const db = require("../database/models");
const Op = require("sequelize");
module.exports = {
    // RENDERIZA LA VISTA DE REGISTRACION E INICIO DE SESION
    mostrar: (req, res) => {
        res.render("register", { css: '/stylesheets/register.css' });
    },
    // BUSCA EL USUARIO A EDITAR Y LO ENVIA A LA VISTA USEREDIT PARA EDITAR SUS DATOS
    showEditar: (req, res) => {
        const id = req.params.id
        db.User.findByPk(id)
        .then(user =>{
            res.render("userEdit", { css: '/stylesheets/userEdit.css', user })
        })
              
    },
    // RENDERIZA LA VISTA REGISTRO Y SU CSS
    showRegister: (req,res) => {
        res.render('register', {css: '/stylesheets/register.css'})
    },
    // GUARDA EL USUARIO
    guardarUsuario: (req,res) => {
        const {email, adress, adress2} = req.body
        var errors = validationResult(req)
        if(errors.isEmpty()){
            const adressCrypt = bcrypt.hashSync(adress, 10)
            db.User.create({
                email: email,
                password : adressCrypt,
                rol : "user",
                avatar: "avatar.jpeg"
            })
            .then((user)=>{
                req.session.userVulkan = {
                    id : user.id,
                    email: user.email,
                    rol : user.rol,
                    avatar: "avatar.jpeg",
                    username: user.username,
                    first_name: user.first_name

                }
                res.redirect("/")
            })
            .catch(error=>{
                res.send(error)
            })
        }
        else{
            res.render('register', {css: '/stylesheets/register.css', errors: errors.errors })
        }
        
        
    },
    // ESTO PROCESA LOS DATOS A EDITAR DEL USUARIO
    editar: (req,res) => {
        const {username, email, first_name, last_name, city, address} = req.body
        const id = req.params.id
        let imagen;
        if(req.files[0]){
            
            db.User.findByPk(id)
            .then(element=>{
                if(fs.existsSync(path.join('public','images','users',element.avatar))){
                    fs.unlinkSync(path.join('public','images','users',element.avatar))
                    imagen = req.files[0].filename
            }
            })
            .catch(error=>{
                res.send(error + "1")
            })
            imagen = req.files[0].filename
        }else{
            db.User.findByPk(id)
            .then(user=>{
                if(user.avatar != null){
                    imagen = user.avatar
                }else{
                    imagen = "avatar.png"
                }
            })
        }
        db.User.update({
            firstName : first_name,
            username : username,
            email : email,
            lastname : last_name,
            address : address,
            avatar : imagen
        },
        {
            where: {
                id: id
            }
        }).then(()=>{
            res.redirect(`/users/edit/${id}`);
        })
        .catch(error=>{
            res.send(error + "2");
        })
       
    },
    // RENDERIZA LA PARTE DE LOGIN Y SU CSS
    login : (req, res) =>{
        res.render('register', {css: '/stylesheets/register.css'})
    }, 
    processLogin: (req, res) => {
        const {email, password, recordame} = req.body;
        let errores = validationResult(req);  
        if(errores.isEmpty()){
            db.User.findOne({
                where: {
                    email : email
                }
            })
            .then(user=>{
                if(user){
                if(bcrypt.compareSync(password, user.password)){
                    req.session.userVulkan = {
                        id : user.id,
                        username : user.username,
                        email: user.email,
                        first_name : user.firstName,
                        avatar : user.avatar,
                        rol: user.rol
                    }
                
                    if(recordame){
                       
                        res.cookie('userVulkan',req.session.userVulkan,{
                            maxAge : 1000 * 60 * 60 * 24
                        })
                        //console.log(req.cookies.userVulkan);
                    }
                    res.redirect(`/`)
                }else{
                    let errores = [{param: "password",msg:"Credenciales Invalidas"}]
                    res.render("register",{css: '/stylesheets/register.css',errores})
                }
            }else{
                let errores = [{param: "password",msg:"Credenciales Invalidas"}]
                res.render("register",{css: '/stylesheets/register.css',errores})
            }
            })
            .catch(error=>{
                res.send(error +  "1")
            })
        }else{
            res.render("register",{errores : errores.errors,css: '/stylesheets/register.css'})
        }
       
       
    },
    // ESTO RENDERIZA LA VISTA DE ADMIN
    admin : (req,res) => {
        let id = req.params.id
        let brands = db.Brand.findAll()
        let categorys = db.Category.findAll()
        let mensajes = db.Message.findAll({
            where: {                                
                idOtherUSer : id
            },
            include: [{association: "mensajes"}]
        })
        let users = db.User.findAll()
        Promise.all([brands,categorys,mensajes,users])
        .then(([brands,categorys,mensajes,users])=>{
            res.render('admins', {css: '/stylesheets/admin.css',brands,categorys,mensajes,users});
        })
        .catch(error=>{
            res.send(error +"1");
        })
        
    },
    // SI EL USUARIO OPRIME EL BOTON CERRAR SESION 
    // DESTRUIMOS LA SESION Y LA COOKIE
    // REDIRIGIENDO AL FINAL AL HOME
    cerrarSesion: (req,res)=>{
        
           req.session.destroy()
           if(req.cookies != undefined){
               res.cookie("userVulkan"," ",{
                   maxAge: -100
               });
           }
           res.redirect("/");
        

       
    },
    eliminar : (req,res)=>{
        let id = req.params.id
        let carro = db.Cart.destroy({
            where: {
                idUser : id
            }
        })
        
        let mensajes = db.Message.destroy({
            where: {
                [db.Sequelize.Op.or]: [{idUserMessage: id},{idOtherUSer: id}]
            }
        })
        
        let usuario = db.User.destroy({
            where:{
                id: id
            }
        })
        Promise.all([carro,mensajes,usuario])
        .then(([carro,mensajes,usuario])=>{
            req.session.destroy()
            if(req.cookie != undefined){
                res.cookie("userVulkan"," ",{
                    maxAge: -100
                });
            }
            res.redirect("/")
        })
        .catch(error=>{
            res.send(error + "1");
        })
    },
    showProfile: (req,res)=>{
        let id = req.params.id
        let users = db.User.findAll()
        let user = db.User.findByPk(id,
            {
                include: [{association : "carrito"}]
            })
        let mensajes = db.Message.findAll({
            where: {                
                idOtherUSer : id
            },
            include: [{association: "mensajes"}]
        })
        Promise.all([users,user,mensajes])
        .then(([users,user,mensajes])=>{
            res.render("profile",{users,user,mensajes,css: "/stylesheets/userProfile.css"})
        })
        .catch(error=>{
            res.send(error)
        })
    },
    crearMensaje: (req,res)=>{
        let id = req.params.id
        let idOtherUser = req.body.idOtherUser
        db.Message.create({
            idUserMessage: id,
            idOtherUSer : idOtherUser,
            message : req.body.mensaje
        })
        .then(()=>{
            res.redirect(req.get('referer'));
        })
        .catch(error=>{
            res.send(error)
        })
    },
    relacion : (req,res)=>{
        const marca = req.body.marca;
        const categoria = req.body.categoria;
        db.Relation.create({
            idBrandsFromCategory : marca,
            idCategorysFromBrand: categoria
        }).
        then(()=>{
            res.redirect("/users/admin");
        })
        .catch(error=>{
            res.send(error);
        })
    }
}