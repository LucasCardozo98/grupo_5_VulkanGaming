var express = require('express');
var router = express.Router();
const usersController = require("../controllers/usersController");
//recordar poner las rutas finales

router.get('/',usersController.mostrar)

module.exports = router;