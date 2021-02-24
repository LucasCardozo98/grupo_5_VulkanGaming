var express = require('express');
const multer = require('multer');
var router = express.Router();
const usersController = require("../controllers/usersController");
const upload = require("../middlewares/multerUsers");
const registerValidator = require('../middlewares/registerValidator')
//recordar poner las rutas finales

router.get('/', usersController.mostrar);
router.get("/edit/:id", usersController.showEditar);
router.put("/edit/:id", upload.any(), usersController.editar);
router.get('/register', usersController.showRegister);
router.post('/register', registerValidator, usersController.guardarUsuario)

module.exports = router;
