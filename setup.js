const fs = require('fs');
const path = require('path');

// Define the directory structure and files to be created
const structure = {
    'controllers': {
        'userController.js': `const User = require('../models/User');

exports.getUserDetails = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUserDetails = async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { email: req.params.email },
            req.body,
            { new: true }
        );
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteUserAccount = async (req, res) => {
    try {
        await User.findOneAndDelete({ email: req.params.email });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};`,
        'documentController.js': `const Document = require('../models/Document');

exports.uploadDocument = async (req, res) => {
    const { title, content, ownerId } = req.body;
    const newDocument = new Document({ title, content, ownerId });
    try {
        await newDocument.save();
        res.status(201).json(newDocument);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};`
    },
    'models': {
        'User.js': `const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);
module.exports = User;`,
        'Document.js': `const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }, // or a Buffer if storing binary files
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Document = mongoose.model('Document', documentSchema);
module.exports = Document;`
    },
    'routes': {
        'userRoutes.js': `const express = require('express');
const { getUserDetails, updateUserDetails, deleteUserAccount } = require('../controllers/userController');

const router = express.Router();

router.get('/:email', getUserDetails);
router.put('/:email', updateUserDetails);
router.delete('/:email', deleteUserAccount);

module.exports = router;`,
        'documentRoutes.js': `const express = require('express');
const { uploadDocument } = require('../controllers/documentController');

const router = express.Router();

router.post('/upload', uploadDocument);

module.exports = router;`
    },
    'middleware': {
        'authMiddleware.js': `// Middleware for authentication if needed
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };`
    },
    'config': {
        'db.js': `const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;`
    },
    'server.js': `const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const documentRoutes = require('./routes/documentRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/documents', documentRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(\`Server running on http://localhost:\${PORT}\`);
});`,
    '.env': `MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret` // Add any other environment variables you may need
};

// Function to create the directory structure
const createStructure = (basePath, structure) => {
    for (const [name, content] of Object.entries(structure)) {
        const currentPath = path.join(basePath, name);
        if (typeof content === 'string') {
            // Create file and write content
            fs.writeFileSync(currentPath, content);
            console.log(`Created file: ${currentPath}`);
        } else {
            // Create directory and recursively create its structure
            fs.mkdirSync(currentPath, { recursive: true });
            createStructure(currentPath, content);
        }
    }
};

// Execute the structure creation
createStructure(__dirname, structure);
