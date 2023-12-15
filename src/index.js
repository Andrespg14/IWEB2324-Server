// Aqui se encuentra el codigo del servidor
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

// imports middleware (MODIFICAR)
const userRoutes = require("./routes/user");

// middleware (MODIFICAR)
app.use(express.json());
app.use("/users", userRoutes);

// routes
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

// mongodb conection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error(error));

app.listen(port, "https://iweb-2324-server.vercel.app/", () =>
  console.log("server listening on port", port)
);
