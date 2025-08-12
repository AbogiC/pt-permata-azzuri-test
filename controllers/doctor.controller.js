const db = require("../models");
const Doctor = db.doctors;
const { Op } = require("sequelize");

exports.create = async (req, res) => {
  if (!req.body.nama || !req.body.spesialis) {
    return res.status(400).send({
      message: "Name and specialization are required",
    });
  }

  try {
    const existingDoctor = await Doctor.findOne({
      where: { nama: req.body.nama },
    });

    if (existingDoctor) {
      return res.status(400).send({
        response: "duplicate_data",
        message: `Doctor with name ${req.body.nama} already exists`,
      });
    }

    const doctor = {
      nama: req.body.nama,
      spesialis: req.body.spesialis,
    };
    const createdDoctor = await Doctor.create(doctor);
    res.send(createdDoctor);
  } catch (error) {
    console.error("Error creating doctor:", error);
    res.status(500).send({
      message: "An error occurred while creating the doctor",
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const doctors = await Doctor.findAll();
    res.send(doctors);
  } catch (error) {
    console.error("Error retrieving doctors:", error);
    res.status(500).send({
      message: "An error occurred while retrieving doctors",
    });
  }
};

exports.findBySpesialis = async (req, res) => {
  const spesialis = req.params.spesialis;

  try {
    const doctors = await Doctor.findAll({
      where: { spesialis: { [db.Sequelize.Op.like]: `%${spesialis}%` } },
    });

    if (doctors.length === 0) {
      return res.status(404).send({
        message: `No doctors found with specialization ${spesialis}`,
      });
    }

    res.status(201).send(doctors);
  } catch (error) {
    console.error("Error retrieving doctors by specialization:", error);
    res.status(500).send({
      message: "An error occurred while retrieving doctors by specialization",
    });
  }
};
