var express = require('express');
var router = express.Router();
const usersController = require("../controllers/usersController");
const upload = require("../middlewares/multer");
//recordar poner las rutas finales

router.get('/',usersController.mostrar);
router.get("/edit/:id",usersController.showEditar);

module.exports = router;
