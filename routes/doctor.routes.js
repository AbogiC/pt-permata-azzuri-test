const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctor.controller.js");

router.post("/", doctorController.create);
router.get("/", doctorController.findAll);
router.get("/spesialis/:spesialis", doctorController.findBySpesialis);

module.exports = router;
