const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/auth");
const userController = require('../controllers/user');
const userValidators = require('../middleware/validators/userValidator');

require('dotenv').config();

router.post("/register", userValidators.registrationValidator, userController.registerUser);

router.post("/login", userValidators.loginValidator, userController.loginUser);

router.get("/current", validateToken.validateToken, userController.currentUser);

module.exports = router;
