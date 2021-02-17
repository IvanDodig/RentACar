const { Router } = require("express");
const authController = require("../controllers/authController");

const router = Router();

router.get("/prijava", authController.prijava_get);
router.post("/prijava", authController.prijava_post);

router.get("/registracija", authController.registracija_get);
router.post("/registracija", authController.registracija_post);

module.exports = router;
