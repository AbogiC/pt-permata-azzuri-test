const db = require("../models");
const Booking = db.bookings;
const DoctorSchedule = db.schedules;
const { Op } = require("sequelize");

exports.createBooking = async (req, res) => {
  if (
    !req.body.id_dokter ||
    !req.body.nama_pasien ||
    !req.body.telepon_pasien ||
    !req.body.tanggal_janjian ||
    !req.body.waktu_janjian
  ) {
    return res.status(400).send({
      message: "All fields are required",
    });
  }

  try {
    const bookingDate = new Date(req.body.tanggal_janjian);
    const dayOfWeek = bookingDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
    const bookingTime = req.body.waktu_janjian;

    const doctor = await db.doctors.findByPk(req.body.id_dokter);
    if (!doctor) {
      return res.status(404).send({
        message: "Doctor not found",
      });
    }

    const schedule = await DoctorSchedule.findOne({
      where: {
        id_dokter: req.body.id_dokter,
        hari: dayOfWeek,
        mulai_praktek: { [Op.lte]: bookingTime },
        selesai_praktek: { [Op.gte]: bookingTime },
      },
    });
    if (!schedule) {
      return res.status(404).send({
        message: "Doctor is not available at the selected time",
      });
    }

    const existingBooking = await Booking.findOne({
      where: {
        id_dokter: req.body.id_dokter,
        tanggal_janjian: req.body.tanggal_janjian,
        waktu_janjian: req.body.waktu_janjian,
        status: { [Op.not]: "cancelled" },
      },
    });

    if (existingBooking) {
      return res.status(400).send({
        message: "This time slot is already booked",
      });
    }

    const booking = {
      id_dokter: req.body.id_dokter,
      nama_pasien: req.body.nama_pasien,
      telepon_pasien: req.body.telepon_pasien,
      tanggal_janjian: req.body.tanggal_janjian,
      waktu_janjian: req.body.waktu_janjian,
    };

    const createdBooking = await Booking.create(booking);
    res.status(201).send(createdBooking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).send({
      message: "An error occurred while creating the booking",
    });
  }
};

exports.findByDoctorId = async (req, res) => {
  const doctorId = req.params.id_dokter;

  try {
    const bookings = await Booking.findAll({
      where: { id_dokter: doctorId },
      include: [
        {
          model: db.doctors,
          attributes: ["nama", "spesialis"],
        },
      ],
      order: [
        ["tanggal_janjian", "ASC"],
        ["waktu_janjian", "ASC"],
      ],
    });

    if (bookings.length === 0) {
      return res.status(404).send({
        message: "No bookings found for this doctor",
      });
    }

    res.status(200).send(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).send({
      message: "An error occurred while fetching the bookings",
    });
  }
};
