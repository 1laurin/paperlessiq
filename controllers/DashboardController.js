const Dashboard = require('../models/Dashboard'); // Import the Dashboard model

// Get Dashboard Data
exports.getDashboard = async (req, res) => {
    try {
        const dashboard = await Dashboard.findOne(); // Fetch dashboard data
        if (!dashboard) {
            return res.status(404).json({ message: "Dashboard not found" });
        }
        res.status(200).json(dashboard);
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ message: "Error fetching dashboard data" });
    }
};

// Create a New Dashboard
exports.createDashboard = async (req, res) => {
    try {
        const newDashboard = new Dashboard(req.body); // Create new dashboard from request body
        const savedDashboard = await newDashboard.save();
        res.status(201).json(savedDashboard);
    } catch (error) {
        console.error("Error creating dashboard:", error);
        res.status(500).json({ message: "Error creating dashboard" });
    }
};

// Update Existing Dashboard
exports.updateDashboard = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedDashboard = await Dashboard.findByIdAndUpdate(id, req.body, {
            new: true,
        }); // Update dashboard by ID
        if (!updatedDashboard) {
            return res.status(404).json({ message: "Dashboard not found" });
        }
        res.status(200).json(updatedDashboard);
    } catch (error) {
        console.error("Error updating dashboard:", error);
        res.status(500).json({ message: "Error updating dashboard" });
    }
};

// Delete a Dashboard
exports.deleteDashboard = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedDashboard = await Dashboard.findByIdAndDelete(id); // Delete dashboard by ID
        if (!deletedDashboard) {
            return res.status(404).json({ message: "Dashboard not found" });
        }
        res.status(200).json({ message: "Dashboard deleted successfully" });
    } catch (error) {
        console.error("Error deleting dashboard:", error);
        res.status(500).json({ message: "Error deleting dashboard" });
    }
};
