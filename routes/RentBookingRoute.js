const Rent = require('../models/RentModel'); // Ensure this path is correct

// Function to get all bookings
const findAll = async (req, res) => {
    try {
        const rents = await Rent.findAll(); // Assuming Rent is your model
        res.json(rents);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching rents.' });
    }
};

// Function to create a new booking
const save = async (req, res) => {
    try {
        const newRent = await Rent.create(req.body); // Assuming req.body contains the necessary data
        res.status(201).json(newRent);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating rent.' });
    }
};

module.exports = { findAll, save };