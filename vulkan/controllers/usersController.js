module.exports = {
    mostrar: (req,res) =>{  
        res.render("register",{css:'/stylesheets/register.css'});
    },
    showEditar: (req,res)=>{
        res.render("userEdit",{css:'/stylesheets/userEdit.css'});
    }
}