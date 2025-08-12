const { Sequelize } = require("sequelize");
const config = require("../config/config.js");

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.doctors = require("./doctor.model.js")(sequelize, Sequelize);
db.schedules = require("./schedule.model.js")(sequelize, Sequelize);
db.bookings = require("./booking.model.js")(sequelize, Sequelize);

db.doctors.hasMany(db.schedules, { foreignKey: "id_dokter" });
db.schedules.belongsTo(db.doctors, { foreignKey: "id_dokter" });
db.doctors.hasMany(db.bookings, { foreignKey: "id_dokter" });
db.bookings.belongsTo(db.doctors, { foreignKey: "id_dokter" });

module.exports = db;
