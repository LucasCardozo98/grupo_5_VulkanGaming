const fs = require("fs");
const products = JSON.parse(fs.readFileSync("./data/products.json", "utf-8"));
module.exports = {
    mostrar: (req, res) => {
        res.render("products", { css: '/stylesheets/products.css' });
    },
    storeProduct: (req, res) => {
        console.log(req.body)
        const { name, category, trademark, price, } = req.body
        let id = 0;
        products.forEach(element => {
            if (element.id == id) {
                id = id
            }
        });
        const product = {
            id: id + 1,
            name,
            category,
            trademark,
            price,
            image: req.files[0].filename
        }
        products.push(product);
        let nuevojson = JSON.stringify(products);
        fs.writeFileSync("./data/products.json", nuevojson, "utf-8");
        console.log(product);
        res.redirect("/products/create");

    },
    cart: (req, res) => {
        res.render("carrito", { css: '/stylesheets/carrito.css' });
    },
    productDetail: (req, res) => {
        res.render("detail", { css: '/stylesheets/index.css' });
    },
    crearProducto: (req, res) => {
        res.render("productCreate", { css: '/stylesheets/admin.css' });
    },
}
