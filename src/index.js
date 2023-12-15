// Aqui se encuentra el codigo del servidor
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 8000;

// imports middleware (MODIFICAR)
const userRoutes = require("./routes/user");

// middleware (MODIFICAR)
app.use(express.json());
app.use('/users', userRoutes)

// routes
app.get('/', (req, res) => {
    res.send("Welcome to my API")
})

// mongodb conection
mongoose.connect(
    "mongodb+srv://Profesor:2emg0lp1WJBtyEdG@exameniweb.syarvz8.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) => console.error(error));

app.listen(port, () => console.log('server listening on port', port))