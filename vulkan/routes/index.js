var express = require('express');
var router = express.Router();
const indexController = require("../controllers/indexController");


//CONDUCE A LA RUTA HOME Y PASA AL CONTROLLER
router.get('/', indexController.mostrar)

module.exports = router;
