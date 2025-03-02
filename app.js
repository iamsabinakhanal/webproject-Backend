const express = require('express');
const cors = require('cors');
const path = require('path');
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
app.use('/admin', express.static(path.join(__dirname, 'public/admin.html')));

// Routes
app.use('/api/accessories', accessoriesRoutes);
app.use('/api/renting', rentingRoutes);
app.use('/api/users', userRoutes);

// Error handling for Multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer error (e.g., file size exceeded)
    res.status(400).json({ error: err.message });
  } else if (err) {
    // Other errors
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});