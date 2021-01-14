const express = require("express");
const carController = require("../controllers/carController");

const router = express.Router();

router.get("/", carController.car_index);
router.get("/:id", carController.car_details);

module.exports = router;
