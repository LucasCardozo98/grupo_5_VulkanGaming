var express = require('express');
var router = express.Router();
const adminController = require("../controllers/adminController");
//recordar poner las rutas finales

router.get('/',adminController.mostrar)

module.exports = router;