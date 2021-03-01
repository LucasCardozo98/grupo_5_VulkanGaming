const fs = require("fs");
const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const path = require("path");
module.exports = {
    mostrar: (req, res) => {
        res.render("register", { css: '/stylesheets/register.css' });
    },
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
    showRegister: (req,res) => {
        res.render('register', {css: '/stylesheets/register.css'})
    },
    guardarUsuario: (req,res) => {
        const {email, adress, adress2} = req.body
        var errors = validationResult(req)
        let lastId = 0
        users.forEach(element => {
            if(element.id > lastId){
               lastId = element.id
            }
        });
        
        if (errors.isEmpty()) {
            const adressCrypt = bcrypt.hashSync(adress, 10)
            const user = {
                id : lastId + 1,
                email,
                password : adressCrypt, 
                avatar : " ",
                username : " ",
                first_name : " ",
                last_name : " ",
                city : " ",
                addres: " ",
                rol: " "            
            }
            users.push(user)
         let nuevojson = JSON.stringify(users, null, 2);
         fs.writeFileSync("./data/users.json",nuevojson,"utf-8");
         res.redirect("/users");
        } else {
            res.render('register', {css: '/stylesheets/register.css', errors: errors.errors })
            
        }
    },
    editar: (req,res) => {
        const {username, email, first_name, last_name, city, address} = req.body
        const id = req.params.id
        let user;
        users.forEach(element => {
            if (element.id == id) {
                element.first_name = first_name
                element.username = username
                element.email = email
                element.last_name = last_name
                element.city = city
                element.address = address
                if (req.files[0]) {
                    
                    if(fs.existsSync(path.join('public','images','users',element.avatar))){
                            fs.unlinkSync(path.join('public','images','users',element.avatar))
                            element.avatar = req.files[0].filename
                    }
                    else{
                        element.avatar = req.files[0].filename
                    }

                }
            }
        });  
         let nuevojson = JSON.stringify(users, null, 2);
         fs.writeFileSync("./data/users.json",nuevojson,"utf-8");
         res.redirect(`/users/edit/${id}`);  
    },
    login : (req, res) =>{
        res.render('register', {css: '/stylesheets/register.css'})
    }, 
    processLogin: (req, res) => {
        
        let errores = validationResult(req);      

        if(!errores.isEmpty()){
            return res.render('register',{
                errores : errores.errors, 
                css: '/stylesheets/register.css'
            })
        }else{
            const {email, password, recordame} = req.body;

            let result = users.find(user => user.email === email);

            if(result){
                if(bcrypt.compareSync(password.trim(),result.password)){

                    req.session.user = {
                        id : result.id,
                        username : result.username,
                        email: result.email,
                        first_name: result.first_name,
                        avatar : result.avatar,
                        rol: result.rol
                    }

                    if(recordame){
                        res.cookie('userVulkan',req.session.user,{
                            maxAge : 1000 * 60 * 60 * 24
                        })
                    }

                    return res.redirect(`/users/edit/${result.id}`)
                }
            }
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
    admin : (req,res) => {
        res.render('admins', {css: ''})
    }
}