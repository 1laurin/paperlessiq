const express = require('express');
const cors = require('cors');
const path = require('path'); // Required to serve static files
const connectDB = require('./config/db'); // Corrected path for MongoDB connection
const userRoutes = require('./routes/userRoutes');
const documentRoutes = require('./routes/documentRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const auditLogsRoutes = require('./routes/auditLogsRoutes');
const complianceRoutes = require('./routes/complianceRoutes');
const settingsRoutes = require('./routes/SettingsRoutes');
const exportRoutes = require('./routes/exportRoutes');
const notificationsRoutes = require('./routes/NotificationsRoutes');
const integrationSettingsRoutes = require('./routes/IntegrationSettingsRoutes');
const userManagementRoutes = require('./routes/UserManagementRoutes');
const authRoutes = require('./routes/authRoutes');
const searchRoutes = require('./routes/searchRoutes');
const businessRoutes = require('./routes/businessRoutes');
const leadsRoute = require('./routes/leads'); // Updated path and name

require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json()); // Built-in body parser

// Connect to MongoDB
connectDB(); // Calls the function from db.js to connect to MongoDB

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/audit-logs', auditLogsRoutes);
app.use('/api/compliance', complianceRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/integration-settings', integrationSettingsRoutes);
app.use('/api/user-management', userManagementRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/business', businessRoutes);
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
