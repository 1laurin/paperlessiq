const express = require('express');
const cors = require('cors');
const path = require('path'); // Required to serve static files
const connectDB = require('./config/db'); // Corrected path for MongoDB connection
const authRoutes = require('./routes/authRoutes');
const leadsRoute = require('./routes/leads'); // Updated path and name

require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json()); // Built-in body parser

// Connect to MongoDB
connectDB(); // Calls the function from db.js to connect to MongoDB

// Minimal API Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadsRoute);

// Root route for API
app.get('/api', (req, res) => {
    res.send('Welcome to the Document Digitization API!');
});

// Serve React Frontend
const buildPath = path.join(__dirname, 'build'); // Adjusted path for the React build directory
app.use(express.static(buildPath));

// Catch-all route for React
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
