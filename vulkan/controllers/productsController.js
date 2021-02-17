const fs = require("fs");
const products = JSON.parse(fs.readFileSync("./data/products.json","utf-8"));
module.exports = {
    mostrar: (req,res) =>{  
        res.render("products",{css:'/stylesheets/products.css',products});
    },    
    storeProduct: (req,res)=>{
        console.log(req.body)
        const {name,category,trademark,price,description} = req.body
        let lastId = 0;
        products.forEach(element => {
            if(element.id > lastId){
               lastId = element.id
            }
        });
        const product = {
            id : lastId +1,
            name,
            category,
            trademark,
            price,
            description,
            image: req.files[0].filename
        }
         products.push(product);
         let nuevojson = JSON.stringify(products);
         fs.writeFileSync("./data/products.json",nuevojson,"utf-8");
         res.redirect("/products/create");
        
    },
    cart : (req,res) =>{  
        res.render("carrito",{css:'/stylesheets/carrito.css'});
    },
    productDetail: (req,res)=>{
        res.render("detail",{css:'/stylesheets/index.css'});
    },
    crearProducto : (req,res)=>{
        res.render("productCreate",{css:'/stylesheets/admin.css'});
    },
    showEdit: (req,res)=>{
        const id = req.params.id
        let product;
        products.forEach(element => {
            if(element.id == id){
                product = element
            }
        });

        res.render("productEdit",{css:'/stylesheets/admin.css', product });
    },
    edit: (req,res)=>{
        let id = req.params.id
        const {name,category,trademark,price,description} = req.body
        products.forEach(element =>{
            if(element.id == Number(id)){
                element.name = name;
                element.category = category;
                element.trademark = trademark;
                element.price = price;
                element.description = description;
            }
        });
        let nuevijson = JSON.stringify(products);
         fs.writeFileSync("./data/products.json",nuevijson,"utf-8");
           console.log(id)
         res.redirect("/products");
    },
    delete: (req,res)=>{
        let id = req.params.id
        let indice;
        products.forEach(element => {
            if(element.id == Number(id)){
             indice = products.indexOf(element)
            }
        });
        
        products.splice(indice,1);
        let nuevijson = JSON.stringify(products);
         fs.writeFileSync("./data/products.json",nuevijson,"utf-8");
           console.log(id)
         res.redirect("/");
    }
}
