module.exports = (sequelize, Sequelize) => {
  const Booking = sequelize.define("jadwal_pasien_dokter", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_dokter: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    nama_pasien: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    telepon_pasien: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tanggal_janjian: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    waktu_janjian: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM("pending", "confirmed", "cancelled"),
      defaultValue: "pending",
    },
  });
  return Booking;
};
