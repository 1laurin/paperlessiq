const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;

// Serve React frontend from my-api/build
const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));

// Catch-all route for React
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
