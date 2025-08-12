const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers/schedule.controller.js");

router.post("/", scheduleController.createSchedule);
router.get("/:id_dokter", scheduleController.getSchedulesByDoctor);

module.exports = router;
