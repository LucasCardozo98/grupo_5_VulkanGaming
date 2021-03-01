const fs = require("fs");
const products = JSON.parse(fs.readFileSync("./data/products.json","utf-8"));
const path = require("path");
const {validationResult} = require("express-validator");
module.exports =  {
    //aca empieza la muestra de productos de diferentes categorias
    mostrar: (req,res) =>{  
        res.render("products",{css:'/stylesheets/products.css',products});
    },
    showCategory: (req,res)=>{
        const category = req.params.categoria;
        const productsCategory = products.filter(product => product.category == category)
        res.render("category",{css:"/stylesheets/productsCategory.css",productsCategory, category});
    },
    storeProduct: (req,res)=>{
        const {name,category,brand,price,description} = req.body
        let lastId = 0;
        let errors = validationResult(req);
        if(errors.isEmpty()){
            products.forEach(element => {
                if(element.id > lastId){
                   lastId = element.id
                }
            });
            if(req.files[0]){
                const product = {
                    id : lastId +1,
                    name,
                    category,
                    brand,
                    price,
                    description,
                    image: req.files[0].filename
                }
            }else{
                const product = {
                    id : lastId +1,
                    name,
                    category,
                    brand,
                    price,
                    description,
                    image: " "
                }
            }
            
             products.push(product);
             let nuevojson = JSON.stringify(products, null, 2);
             fs.writeFileSync("./data/products.json",nuevojson,"utf-8");
             res.redirect("/products/create");
        }
        else{
            res.render("productCreate",{css:'/stylesheets/admin.css', errors :errors.errors });
        }
       
        
       
        
    },
    cart : (req,res) =>{  
        res.render("carrito",{css:'/stylesheets/carrito.css'});
    },
    productDetail: (req,res)=>{
        const id = req.params.id
        let product;
        products.forEach(element => {
            if(element.id == id){
                product = element
            }
        });
        res.render("detail",{css:'/stylesheets/index.css',product});
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
        const {name,category,brand,price,description} = req.body
        const errors = validationResult(req);
        let product;
        if(errors.isEmpty()){
            products.forEach(element =>{
                if(element.id == Number(id)){
                    element.name = name;
                    element.category = category;
                    element.brand = brand;
                    element.price = price;
                    element.description = description;
                    if(req.files[0]){
                        if(fs.existsSync(path.join('public','images',element.image))){
                            fs.unlinkSync(path.join('public','images',element.image))
                            element.image = req.files[0].filename
                        }
                        else{
                            element.image = req.files[0].filename
                        }
    
                    }
                }
            });
            let nuevijson = JSON.stringify(products,null,2);
             fs.writeFileSync("./data/products.json",nuevijson,"utf-8");
               console.log(id)
             res.redirect("/products");
        }else{
            products.forEach(producto=>{
                if(producto.id == id){
                    product  = producto
                }
            })
            res.render("productEdit",{css:'/stylesheets/admin.css', product, errors: errors.errors});
        }
     
    },
    delete: (req,res)=>{
        let id = req.params.id
        let indice;
        products.forEach(element => {
            if(element.id == Number(id)){
             indice = products.indexOf(element)
             if(fs.existsSync(path.join('public','images',element.image))){
                fs.unlinkSync(path.join('public','images',element.image))
            }
            }
        });
        
        products.splice(indice,1);
        let nuevijson = JSON.stringify(products);
         fs.writeFileSync("./data/products.json",nuevijson,"utf-8");
           console.log(id)
         res.redirect("/products");
    },
    adminList: (req,res)=>{
        res.render("productsAll", {css:"/stylesheets/productsCategory.css",products})
    }
}