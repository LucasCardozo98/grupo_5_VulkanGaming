var express = require('express');
var router = express.Router();
const cartController = require("../controllers/cartController");
//recordar poner las rutas finales

router.get('/',cartController.mostrar)

module.exports = router;