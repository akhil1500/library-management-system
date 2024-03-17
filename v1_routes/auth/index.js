const express = require("express");

const router = express.Router();

const authController = require("../../controllers/auth/index");

const paramsValidator = require("../../middlewares/paramsValidator");

router.post("/login", paramsValidator(authController.loginParams()) ,authController.login);

module.exports = router;