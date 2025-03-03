const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const accessoriesRoutes = require('./routes/AccessoriesRoute');
const rentingRoutes = require('./routes/RentBookingRoute');
const userRoutes = require('./routes/UserRoute');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve the admin panel
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'backend/public/admin.html'));
});

// Routes
app.use('/api/accessories', accessoriesRoutes);
app.use('/api/renting', rentingRoutes);
app.use('/api/users', userRoutes);

// Error handling for Multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({ error: err.message });
  } else if (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});