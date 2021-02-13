var express = require('express');
var router = express.Router();
const productsController = require("../controllers/productsController");

//recordar poner las rutas finales
router.get('/',productsController.mostrar); 
router.get("/:id",productsController.productDetail);
router.get("/newProduct",productsController.newProduct);
router.get("/cart",productsController.cart)

module.exports = router;