module.exports = (sequelize, Sequelize) => {
  const Schedule = sequelize.define("jadwal_dokter", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_dokter: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    hari: {
      type: Sequelize.ENUM(
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ),
      allowNull: false,
    },
    mulai_praktek: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    selesai_praktek: {
      type: Sequelize.TIME,
      allowNull: false,
    },
  });

  return Schedule;
};
