const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const Accessories = require('../models/AccessoriesModel');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Get all accessories
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all accessories...');
    const accessories = await Accessories.findAll();
    console.log('Accessories fetched:', accessories);
    res.json(accessories);
  } catch (err) {
    console.error('Error fetching accessories:', err);
    res.status(500).json({ error: err.message });
  }
});

// Add a new accessory
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description, type } = req.body;
    const image = req.file ? req.file.path : null;
    const newAccessory = await Accessories.create({ title, image, description, type });
    res.status(201).json(newAccessory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an accessory
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, type } = req.body;
    const image = req.file ? req.file.path : null;
    const accessory = await Accessories.findByPk(id);
    if (!accessory) {
      return res.status(404).json({ error: 'Accessory not found' });
    }
    accessory.title = title;
    accessory.image = image || accessory.image;
    accessory.description = description;
    accessory.type = type;
    await accessory.save();
    res.json(accessory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an accessory
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const accessory = await Accessories.findByPk(id);
    if (!accessory) {
      return res.status(404).json({ error: 'Accessory not found' });
    }
    await accessory.destroy();
    res.json({ message: 'Accessory deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;