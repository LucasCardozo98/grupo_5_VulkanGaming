var express = require('express');
var router = express.Router();
const registerController = require("../controllers/registerController");
const registerValidation = require("../middlewares/registerValidation");