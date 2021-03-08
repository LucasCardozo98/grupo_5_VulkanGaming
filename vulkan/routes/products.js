var express = require('express');
var router = express.Router();
const productsController = require("../controllers/productsController");
// SE REQUIERE MULTER DE PRODUCTOS
const upload = require("../middlewares/multerProducts");
// REQUIERE EL LOGIN CHECK PARA CHEQUEAR EL INICIO DE SESION
const loginCheck = require('../middlewares/logincheck');
// REQUIERE ADMIN CHECK PARA CHEQUEAR QUE EL USUARIO SEA ADMINISTRADOR
const adminCheck = require("../middlewares/adminCheck");
//REQUIERE LA VALIDACION PARA LOS FORMULARIOS DE PRODUCTS
const formProductsValidation = require("../middlewares/formsProductValidation");

//recordar poner las rutas finales
router.get('/',productsController.mostrar); 
router.get("/list",adminCheck,productsController.adminList);
router.get("/category/:categoria",productsController.showCategory)
router.get("/detail/:id",productsController.productDetail);
router.get("/create",adminCheck,productsController.crearProducto);
router.post("/create",upload.any(),formProductsValidation,productsController.storeProduct);
router.get("/edit/:id",adminCheck,productsController.showEdit);
router.put("/edit/:id",upload.any(),formProductsValidation,productsController.edit);
router.delete("/delete/:id",productsController.delete);
router.get("/cart/:id",loginCheck,productsController.cart)
router.post("/cart/:idProduct/:idUser",productsController.crearCarrito);
router.delete("/cart/delete/:idProduct/:idUser",productsController.eliminarProductoCarrito);
router.get("/buscador",productsController.buscador);
router.get("/filtrado",productsController.filtrado);
router.post("/api/vl/mercadopago/:id",productsController.mercadoPago)

module.exports = router;