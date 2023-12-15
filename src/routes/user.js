const express = require("express");
// Importar modelos (MODIFICAR)
const userSchema = require("../models/user");

const router = express.Router();

////// Definir rutas

// GET ALL USERS
router.get('/', async (req, res) => {
    userSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// GET USER BY ID
router.get('/:id', async (req, res) => {
    userSchema
        .findById(req.params.id)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
})

// CREATE USER
router.post('/', (req, res) => {
    const user = userSchema(req.body);
    user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

// UPDATE USER
router.put('/:id', async (req, res) => {
    const updateParams = req.body;
    userSchema
        .findOneAndUpdate({"_id": req.params.id}, updateParams, {new: true})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});


// DELETE USER BY ID
router.delete('/:id', async(req, res) => {
    userSchema
        .findOneAndDelete({"_id": req.params.id})
        .then(() => res.status(200).json({message: "User deleted"}))
        .catch((error) => res.json({message: error}));
});

// GET ALL CONTACTS DE UN USER
router.get('/:id/contacts', async (req, res) => {
    userSchema
        .findById({"_id": req.params.id})
        .then((data) => res.json(data.contacts))
        .catch((error) => res.json({message: error}));
});

// POST CONTACTO TO THE LISTA DE UN USER
router.post('/:id/contacts', async (req, res) => {
    const user = await userSchema
        .findById({"_id": req.params.id})
        .catch((error) => res.json({message: error}));

    user.contacts.push(req.body.contact);

    userSchema
        .findByIdAndUpdate({"_id": req.params.id}, user, {new: true})
        .then(() => res.json({message: "Contactos actualizados"}))
        .catch((error) => res.json({message: error}));
});

// DELETE CONTACTO TO THE LISTA DE UN USER
router.delete('/:id/contacts', async (req, res) => {
    const user = await userSchema
        .findById({"_id": req.params.id})
        .catch((error) => res.json({message: error}));

    const contactosUser = user.contacts;
    const contactosActualizados = contactosUser.filter(item => item !== req.body.contact)
    user.contacts = contactosActualizados;

    userSchema
        .findByIdAndUpdate({"_id": req.params.id}, user, {new: true})
        .then(() => res.json({message: "Contacto borrado"}))
        .catch((error) => res.json({message: error}));
});

module.exports = router;