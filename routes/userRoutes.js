const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();

router.post("/login", userController.login);

router.post("/register", userController.register);
router.post("/logout", userController.logout);

module.exports = router;
