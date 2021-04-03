var express = require('express');
var router = express.Router();
//SE REQUIERE EL CONTROLADOR
const usersController = require("../controllers/usersController");
//SE REQUIRE MULTER DE USUARIOS PARA SUBIR IMAGENES A USUARIOS
const upload = require("../middlewares/multerUsers");
// SE REQUIERE LA VALIDACION DE REGISTRO PARA VALIDAR DATOS DEL FORMULARIO AL REGISTRARSE
const registerValidator = require('../middlewares/registerValidator');
//SE REQUIRE LA VALIDACION DE  LOGIN PARA VALIDAR LOS DATOS DEL FORMULARIO DE INICIO DE SESION
const loginValidator = require('../middlewares/loginValidator');
// LOGIN CHECK CHEQUEA QUE HAYA INICIADO SESION PARA INGRESAR A LA RUTA
const loginCheck = require("../middlewares/logincheck");
//  ADMIN CHECK CHEQUEA QUE ESTE LOGEADO UN ADMINISTRADOR PARA INGRESAR A LA RUTA
const adminCheck = require("../middlewares/adminCheck");
const apiController = require("../controllers/apiController");


// DIRIGE A LAS DIFERENTES RUTAS 
router.get('/', usersController.mostrar);
router.get("/edit/:id", loginCheck,usersController.showEditar);
router.put("/edit/:id",upload.any(),usersController.editar);
router.get('/register', usersController.showRegister);
router.post('/register', registerValidator, usersController.guardarUsuario);
router.get('/login', usersController.login);
router.post('/login', loginValidator, usersController.processLogin);
router.post("/closeSesion",usersController.cerrarSesion);
router.get('/admin/:id',adminCheck,usersController.admin);
router.delete("/delete/:id",loginCheck,usersController.eliminar);
router.get("/profile/:id",loginCheck,usersController.showProfile);
router.post("/crearMensaje/:id",usersController.crearMensaje);
router.post("/admin/relacionMarcaCategoria",usersController.relacion);
router.get("/api/usuarios",apiController.usuarios);
router.post("/api/sesion",apiController.iniciarSesion);
router.get("/api/informacion",apiController.informacion);

module.exports = router;
