var express = require('express');
var router = express.Router();
const productsController = require("../controllers/productsController");
const upload = require("../middlewares/multer");

//recordar poner las rutas finales
router.get('/', productsController.mostrar);
router.get("/fuentes", productsController.showCategoryFuentes);
router.get("/gabinetes", productsController.showCategoryGabinetes)
router.get("/motherboards", productsController.showCategoryMotherboards)
router.get("/mouses", productsController.showCategoryMouses)
router.get("/placas", productsController.showCategoryPlacas)
router.get("/procesadores", productsController.showCategoryProcesadores)
router.get("/memorias", productsController.showCategoryMemorias)
router.get("/teclados", productsController.showCategoryTeclados)
router.get("/coolers", productsController.showCategoryCoolers)
router.get("/detail/:id", productsController.productDetail);
router.get("/create", productsController.crearProducto);
//router.post("/create",upload.any(),productsController.storeProduct);
router.post("/create", upload.any(), productsController.storeProduct);
router.get("/edit/:id", productsController.showEdit);
router.put("/edit/:id", productsController.edit);
router.delete("/delete/:id", productsController.delete);
router.get("/cart", productsController.cart)


module.exports = router;