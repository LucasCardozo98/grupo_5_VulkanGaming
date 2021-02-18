const fs = require("fs");
const products = JSON.parse(fs.readFileSync("./data/products.json","utf-8"));
const path = require("path");
module.exports =  {
    //aca empieza la muestra de productos de diferentes categorias
    mostrar: (req,res) =>{  
        res.render("products",{css:'/stylesheets/products.css',products});
    },   
    showCategoryFuentes: (req,res)=>{
        res.render("fuentes",{css:"/stylesheets/productsCategory.css",products});
    },
    showCategoryGabinetes: (req,res)=>{
        
        res.render("gabinetes",{css:"/stylesheets/productsCategory.css",products});
    },
    showCategoryMotherboards: (req,res)=>{
        res.render("motherboard",{css:"/stylesheets/productsCategory.css",products});
    },
    showCategoryMouses: (req,res)=>{
        res.render("mouse",{css:"/stylesheets/productsCategory.css",products});
    },
    showCategoryPlacas: (req,res)=>{
        res.render("placa",{css:"/stylesheets/productsCategory.css",products});
    },
    showCategoryProcesadores: (req,res)=>{
        res.render("procesador",{css:"/stylesheets/productsCategory.css",products});
    },
    showCategoryMemorias: (req,res)=>{
        res.render("memorias",{css:"/stylesheets/productsCategory.css",products});
    },
    showCategoryTeclados: (req,res)=>{
        res.render("teclados",{css:"/stylesheets/productsCategory.css",products});
    },
    showCategoryCoolers: (req,res)=>{
        res.render("coolers",{css:"/stylesheets/productsCategory.css",products});
    },
    storeProduct: (req,res)=>{
        console.log(req.body)
        const {name,category,brand,price,description} = req.body
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
            brand,
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
        products.forEach(element =>{
            if(element.id == Number(id)){
                element.name = name;
                element.category = category;
                element.brand = brand;
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
             if(fs.existsSync(path.join('public','images',element.image))){
                fs.unlinkSync(path.join('public','images',element.image))
            }
            }
        });
        
        products.splice(indice,1);
        let nuevijson = JSON.stringify(products);
         fs.writeFileSync("./data/products.json",nuevijson,"utf-8");
           console.log(id)
         res.redirect("/");
    }
}
