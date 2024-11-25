const express = require('express');
const connectDB = require('./config/db'); // Ensure MongoDB connection
const leadsRouter = require('./routes/leads'); // Adjust the path if needed
const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Use the leads router for /api/leads
app.use('/api/leads', leadsRouter);

// Catch-all for other routes (serves frontend in production)
const path = require('path');
const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
