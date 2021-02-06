module.exports = {
    mostrar: (req,res) =>{  
        res.render("detail",{css:'/stylesheets/index.css'});
    },
    newProduct: (req,res) =>{  
        res.render("newProduct",{css:'/stylesheets/admin.css'});
    },
    cart : (req,res) =>{  
        res.render("cart");
    },
}