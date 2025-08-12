const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking.controller.js");

router.post("/", bookingController.createBooking);
router.get("/:id_dokter", bookingController.findByDoctorId);

module.exports = router;
