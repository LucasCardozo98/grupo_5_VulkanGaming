module.exports = {
    mostrar: (req,res) =>{  
        res.render("products",{css:'/stylesheets/products.css'});
    },
    newProduct: (req,res) =>{  
        res.render("newProduct",{css:'/stylesheets/admin.css'});
    },
    cart : (req,res) =>{  
        res.render("carrito",{css:'/stylesheets/carrito.css'});
    },
    productDetail: (req,res)=>{
        res.render("detail");
    }
}
