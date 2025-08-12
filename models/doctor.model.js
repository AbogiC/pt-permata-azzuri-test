module.exports = (sequelize, Sequelize) => {
  const Doctor = sequelize.define("daftar_dokter", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    spesialis: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Doctor;
};
