const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

const doctorRoutes = require("./routes/doctor.routes.js");
app.use("/dokter", doctorRoutes);

const scheduleRoutes = require("./routes/schedule.routes.js");
app.use("/jadwal", scheduleRoutes);

const bookingRoutes = require("./routes/booking.routes.js");
app.use("/booking", bookingRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Dokter API");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
