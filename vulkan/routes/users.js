var express = require('express');
const multer = require('multer');
var router = express.Router();
const usersController = require("../controllers/usersController");
const upload = require("../middlewares/multerUsers");
const registerValidator = require('../middlewares/registerValidator');
const loginValidator = require('../middlewares/loginValidator');
const loginCheck = require("../middlewares/logincheck");
//recordar poner las rutas finales

router.get('/', usersController.mostrar);
router.get("/edit/:id", loginCheck,usersController.showEditar);
router.put("/edit/:id",upload.any(),usersController.editar);
router.get('/register', usersController.showRegister);
router.post('/register', registerValidator, usersController.guardarUsuario);
router.get('/login', usersController.login);
router.post('/login', loginValidator, usersController.processLogin)
router.get('/admin', usersController.admin)

module.exports = router;
