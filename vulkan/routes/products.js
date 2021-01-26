var express = require('express');
var router = express.Router();
const productsController = require("../controllers/productsController");

//recordar poner las rutas finales
router.get('/',productsController.mostrar)

module.exports = router;