const express = require("express");
const cors = require("cors");
const bibliotecaRoutes = require("./routes/bibliotecaRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("API ON");
});

app.use("/biblioteca", bibliotecaRoutes);
app.use("/user", userRoutes);

module.exports = app;
