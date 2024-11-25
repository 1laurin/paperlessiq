const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware to parse JSON (if your API requires it)
app.use(express.json());

// API routes
app.use('/api', (req, res) => {
    res.json({ message: 'API is working!' });
});

// Serve React frontend from the "build" directory
const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));

// Catch-all route to serve React frontend for non-API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
