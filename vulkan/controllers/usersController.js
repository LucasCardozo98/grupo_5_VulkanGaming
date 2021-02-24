const fs = require("fs");
const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator');

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
                password: adressCrypt             
            }
            users.push(user)
         let nuevojson = JSON.stringify(users, null, 2);
         fs.writeFileSync("./data/users.json",nuevojson,"utf-8");
         res.redirect("/");
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
                    element.avatar = req.files[0].filename
                }
            }
        });  
         let nuevojson = JSON.stringify(users, null, 2);
         fs.writeFileSync("./data/users.json",nuevojson,"utf-8");
         res.redirect(`</users/edit/${id}`);  
    }
}