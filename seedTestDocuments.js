const mongoose = require('mongoose');
const Document = require('./models/Document'); // Adjust path based on your structure

mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Error connecting to MongoDB:", err));

const testDocuments = [
    {
        title: '"Financial Report"',
        fileUrl: "uploads/financial_report.pdf",
        uploadDate: new Date(),
        tags: ["finance", "report"],
        deleted: false,
        metadata: {
            createdBy: "673641cd55b881b940e8b873", // Use a valid user ID
            fileSize: 2048,
            fileType: "application/pdf",
        },
        complianceStatus: {
            isCompliant: true,
            issues: [],
        },
        status: "Uploaded",
        lastModifiedDate: new Date(),
        notifications: [],
    },
    {
        title: '"Annual Report"',
        fileUrl: "uploads/annual_report.pdf",
        uploadDate: new Date(),
        tags: ["annual", "report"],
        deleted: false,
        metadata: {
            createdBy: "673641cd55b881b940e8b873", // Use a valid user ID
            fileSize: 1024,
            fileType: "application/pdf",
        },
        complianceStatus: {
            isCompliant: true,
            issues: [],
        },
        status: "Processed",
        lastModifiedDate: new Date(),
        notifications: [],
    },
];

const insertTestDocuments = async () => {
    try {
        await Document.insertMany(testDocuments);
        console.log("Test documents inserted successfully");
    } catch (error) {
        console.error("Error inserting test documents:", error);
    } finally {
        mongoose.connection.close();
    }
};

insertTestDocuments();
