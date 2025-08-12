const db = require("../models/");
const DoctorSchedule = db.schedules;

exports.createSchedule = async (req, res) => {
  try {
    const { id_dokter, hari, mulai_praktek, selesai_praktek } = req.body;

    if (!id_dokter || !hari || !mulai_praktek || !selesai_praktek) {
      return res.status(400).send({
        message: "All fields are required.",
      });
    }

    const formatJam = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!formatJam.test(mulai_praktek) || !formatJam.test(selesai_praktek)) {
      return res.status(400).send({
        message: "Invalid time format. Use HH:MM (24-hour format).",
      });
    }

    try {
      const doctor = await db.doctors.findByPk(id_dokter);
      if (!doctor) {
        return res.status(404).send({
          message: `Doctor with ID ${id_dokter} not found.`,
        });
      }
      if (mulai_praktek >= selesai_praktek) {
        return res.status(400).send({
          message: "Start time must be earlier than end time.",
        });
      }
      const newSchedule = await DoctorSchedule.create({
        id_dokter,
        hari,
        mulai_praktek,
        selesai_praktek,
      });

      res.status(201).send(newSchedule);
    } catch (error) {
      console.error("Error finding doctor:", error);
      return res.status(500).send({
        message: "An error occurred while checking the doctor.",
      });
    }
  } catch (error) {
    console.error("Error creating schedule:", error);
    res.status(500).send({
      message: "An error occurred while creating the schedule.",
    });
  }
};

exports.getSchedulesByDoctor = async (req, res) => {
  try {
    const { id_dokter } = req.params;

    if (!id_dokter) {
      return res.status(400).send({
        message: "Doctor ID is required.",
      });
    }

    const schedules = await DoctorSchedule.findAll({
      where: { id_dokter },
      order: [
        ["hari", "ASC"],
        ["mulai_praktek", "ASC"],
      ],
    });

    if (schedules.length === 0) {
      return res.status(404).send({
        message: `No schedules found for doctor with ID ${id_dokter}.`,
      });
    }

    res.status(200).send(schedules);
  } catch (error) {
    console.error("Error retrieving schedules:", error);
    res.status(500).send({
      message: "An error occurred while retrieving the schedules.",
    });
  }
};
