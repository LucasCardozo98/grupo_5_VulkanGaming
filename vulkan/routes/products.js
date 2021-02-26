var express = require('express');
var router = express.Router();
const productsController = require("../controllers/productsController");
const upload = require("../middlewares/multerProducts");
const loginCheck = require('../middlewares/logincheck');
const adminCheck = require("../middlewares/adminCheck");

//recordar poner las rutas finales
router.get('/',productsController.mostrar); 
router.get("/list",adminCheck,productsController.adminList);
router.get("/category/:categoria",productsController.showCategory)
router.get("/detail/:id",productsController.productDetail);
router.get("/create",adminCheck,productsController.crearProducto);
//router.post("/create",upload.any(),productsController.storeProduct);
router.post("/create",upload.any(),productsController.storeProduct);
router.get("/edit/:id",adminCheck,productsController.showEdit);
router.put("/edit/:id",upload.any(),productsController.edit);
router.delete("/delete/:id",productsController.delete);
router.get("/cart",loginCheck,productsController.cart)

module.exports = router;