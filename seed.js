const mongoose = require("mongoose");
const Document = require("./models/Document"); // Adjust the path to your Document model

const testData = [
    {
        name: "Project Report.pdf",
        dateUploaded: new Date(),
        lastUpdated: new Date(),
        size: "2MB",
        owner: {
            name: "John Doe",
            avatar: "https://via.placeholder.com/150",
        },
    },
    {
        name: "Invoice_July_2024.docx",
        dateUploaded: new Date(),
        lastUpdated: new Date(),
        size: "1.5MB",
        owner: {
            name: "Jane Smith",
            avatar: "https://via.placeholder.com/150",
        },
    },
];

mongoose
    .connect("mongodb://localhost:27017/docu-data-db", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("Connected to MongoDB");
        await Document.deleteMany({}); // Clear the collection if needed
        const inserted = await Document.insertMany(testData);
        console.log("Inserted test data:", inserted);
        mongoose.connection.close();
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });
