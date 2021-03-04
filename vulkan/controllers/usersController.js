const fs = require("fs");
const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const path = require("path");
module.exports = {
    // RENDERIZA LA VISTA DE REGISTRACION E INICIO DE SESION
    mostrar: (req, res) => {
        res.render("register", { css: '/stylesheets/register.css' });
    },
    // BUSCA EL USUARIO A EDITAR Y LO ENVIA A LA VISTA USEREDIT PARA EDITAR SUS DATOS
    showEditar: (req, res) => {
        const id = req.params.id
        let user;
        
        
            users.forEach(element => {
                if (element.id == id) {
                    user = element
                }
            });
            res.render("userEdit", { css: '/stylesheets/userEdit.css', user });
        
      
        
    },
    // RENDERIZA LA VISTA REGISTRO Y SU CSS
    showRegister: (req,res) => {
        res.render('register', {css: '/stylesheets/register.css'})
    },
    // GUARDA EL USUARIO
    guardarUsuario: (req,res) => {
        const {email, adress, adress2} = req.body
        var errors = validationResult(req)
        let lastId = 0
        users.forEach(element => {
            if(element.id > lastId){
               lastId = element.id
            }
        });
        // ESTE IF EVALUA SI HAY O NO ERRORES EN EL ENVIO DE DATOS
        if (errors.isEmpty()) {
            // SI NO HAY ERRORES SE ENCRIPTA LA CONTRASEÑA Y SE CREA EL OBJETO USER
            const adressCrypt = bcrypt.hashSync(adress, 10)

            const user = {
                id : lastId + 1,
                email,
                password : adressCrypt, 
                avatar : "avatar.png",
                username : " ",
                first_name : " ",
                last_name : " ",
                city : " ",
                addres: " ",
                rol: " "            
            }
            res.redirect("/users");
            // SE GUARDA TODO EN EL JSON 
            users.push(user)
         let nuevojson = JSON.stringify(users,null,2);
         fs.writeFileSync("./data/users.json",nuevojson,"utf-8");
         
        } 
         else {
             // SI POR EL CONTRARIO HAY ERRORES SE ENVIAN A LA VISTA
            res.render('register', {css: '/stylesheets/register.css', errors: errors.errors })
            
        }
    },
    // ESTO PROCESA LOS DATOS A EDITAR DEL USUARIO
    editar: (req,res) => {
        const {username, email, first_name, last_name, city, address} = req.body
        const id = req.params.id
        let user;
        //SE BUSCA EL USUARIO A EDITAR Y SE CAMBIAN SUS DATOS SI LA ID QUE VIENE POR PARAMETRO 
        //ES IGUAL A LA DEL UN ELEMENTO DEL ARRAY
        users.forEach(element => {            
            if (element.id == id) {
                element.first_name = first_name
                element.username = username
                element.email = email
                element.last_name = last_name
                element.city = city
                element.address = address
                // SI EXISTE UNA FOTO TENEMOS VARIOS CAMINOS A SEGUIR
                if (req.files[0]) {
                    // SI EL USUARIO YA TENIA FOTO DEBEMOS ELIMINARLA Y PONER LA NUEVA FOTO
                    if(fs.existsSync(path.join('public','images','users',element.avatar))){
                            fs.unlinkSync(path.join('public','images','users',element.avatar))
                            element.avatar = req.files[0].filename
                    }
                    else{
                        // SI EL USUARIO NO TENIA FOTO PONGAMOS LA NUEVA FOTO
                        element.avatar = req.files[0].filename
                    }

                }
            }
            res.redirect("/")
        });  
        // SE GUARDAN LOS DATOS EN EL JSON
         let nuevojson = JSON.stringify(users, null, 2);
         fs.writeFileSync("./data/users.json",nuevojson,"utf-8");
         //res.redirect(`/users/edit/${id}`);  
         //res.redirect("/")
    },
    // RENDERIZA LA PARTE DE LOGIN Y SU CSS
    login : (req, res) =>{
        res.render('register', {css: '/stylesheets/register.css'})
    }, 
    processLogin: (req, res) => {
        
        let errores = validationResult(req);      
        // SI HAY ERRORES SE RENDERIZAN A LA VISTA 
        if(!errores.isEmpty()){
            return res.render('register',{
                errores : errores.errors, 
                css: '/stylesheets/register.css'
            })
        }else{
            // SI NO HAY ERRORES SE CONSTATA LA INFORMACION BUSCANDO UN USUARIO
            // QUE TENGA EL MISMO MAIL QUE SE ENVIA POR PARAMETRO DE REQ.BODY
            const {email, password, recordame} = req.body;

            let result = users.find(user => user.email === email);
            // SI HAY UN USUARIO CON EL MISMO MAIL SE VERIFICA QUE TENGA LA MISMA CONTRASEÑA
            // QUE LA TENEMOS HASHEADA EN BASE DE DATOS
            if(result){
                if(bcrypt.compareSync(password.trim(),result.password)){
                    // SI TODO ESTA BIEN ES DECIR EL USUARIO ENVIA BIEN MAIL Y CONTRASEÑA
                    // GENERAMOS LA SESION DE EXPRESS-SESSION
                    // DANDOLE A LA SESION LOS DATOS DEL USUARIO 
                    req.session.user = {
                        id : result.id,
                        username : result.username,
                        email: result.email,
                        first_name: result.first_name,
                        avatar : result.avatar,
                        rol: result.rol
                    }
                    // SI LLEGA EL RECUERDAME PUESTO EL USUARIO SE CREA LA COOKIE
                    // CON LOS DATOS DE LA SESION Y LE DAMOS UNA VIDA DE UN DIA
                    if(recordame){
                        res.cookie('userVulkan',req.session.user,{
                            maxAge : 1000 * 60 * 60 * 24
                        })
                    }
                    // LUEGO REDIRIGIMOS AL PERFIL DEL USUARIO
                    return res.redirect(`/users/edit/${result.id}`)
                }
            }
            // POR EL CONTRARIO SI NO EXISTE UN USUARIO CON ESE MAIL ENVIAMOS ESTOS ERRORES
            return res.render('register',{ 
                css: '/stylesheets/register.css',
                errores : [
                    {
                        msg : "credenciales inválidas"
                    }
                ]
            })
        }
    },
    // ESTO RENDERIZA LA VISTA DE ADMIN
    admin : (req,res) => {
        
        res.render('admins', {css: ''})
    },
    // SI EL USUARIO OPRIME EL BOTON CERRAR SESION 
    // DESTRUIMOS LA SESION Y LA COOKIE
    // REDIRIGIENDO AL FINAL AL HOME
    cerrarSesion: (req,res)=>{
        
           req.session.destroy()
           if(req.cookie != undefined){
               res.cookie("userVulkan"," ",{
                   maxAge: -100
               });
           }
           res.redirect("/");
        

       
    }
}