const express = require("express");
const carController = require("../controllers/carController");

const { requireAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", carController.car_index);

router.get("/create", requireAuth, carController.car_create);
router.post("/create", requireAuth, carController.car_create_post);

router.get("/:id", carController.car_details);

module.exports = router;
