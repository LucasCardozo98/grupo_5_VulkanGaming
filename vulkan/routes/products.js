var express = require('express');
var router = express.Router();
const productsController = require("../controllers/productsController");
const upload = require("../middlewares/multerProducts");

//recordar poner las rutas finales
router.get('/',productsController.mostrar); 
router.get("/category/:categoria",productsController.showCategory)
router.get("/detail/:id",productsController.productDetail);
router.get("/create",productsController.crearProducto);
//router.post("/create",upload.any(),productsController.storeProduct);
router.post("/create",upload.any(),productsController.storeProduct);
router.get("/edit/:id",productsController.showEdit);
router.put("/edit/:id",upload.any(),productsController.edit);
router.delete("/delete/:id",productsController.delete);
router.get("/cart",productsController.cart)

module.exports = router;