const express = require("express");
// const morgan = require("morgan");
const cors = require("cors");
const db = require("./db");
const app = express();
const port = process.env.PORT || 5000;
const services = require("./services");

app.use(cors());
app.use(express.json());
// app.use(morgan("dev"));
app.use("/api", services);

db.sequelize.sync({ force: false }).then(() => {
  app.listen(port, () => console.log("server is running: " + port));
  app.on("error", (error) =>
    console.info(" ❌ Server is not running due to : ", error)
  );
});
