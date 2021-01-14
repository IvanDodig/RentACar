const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/prijava", authController.prijava_get);
//router.post("/prijava");

router.get("/registracija", authController.registracija_get);
//router.post("/registracija");

module.exports = router;
