const express = require('express');
const connectDB = require('./config/db'); // Ensure MongoDB connection
const leadsRouter = require('./routes/leads'); // Adjust the path if needed
const cors = require('cors'); // Import CORS
const app = express();

// Connect to MongoDB
connectDB();

// Enable CORS for the frontend domain
app.use(
    cors({
        origin: 'https://www.paperlessiq.com', // Replace with your frontend domain
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
        credentials: true, // Allow cookies/auth if needed
    })
);

// Middleware to parse JSON
app.use(express.json());

// Use the leads router for /api/leads
app.use('/api/leads', leadsRouter);

// Serve React frontend
const path = require('path');
const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
