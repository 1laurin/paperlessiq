const fs = require('fs');
const path = require('path');

// Define the pages and their corresponding models and controllers
const pages = [
    { name: 'AnalyticsReports', model: false },
    { name: 'AuditLogs', model: false },
    { name: 'ComplianceAlert', model: false },
    { name: 'Dashboard', model: false },
    { name: 'DocumentDetails', model: false },
    { name: 'Export', model: false },
    { name: 'Home', model: false },
    { name: 'IntegrationSettings', model: false },
    { name: 'Notifications', model: false },
    { name: 'Register', model: false },
    { name: 'Search', model: false },
    { name: 'Settings', model: false },
    { name: 'TagManagement', model: false },
    { name: 'Upload', model: false },
    { name: 'UserManagement', model: false },
];

// Create controller, model, and route files for each page
pages.forEach(({ name }) => {
    const controllerContent = `const ${name} = require('../models/${name}');\n\n` +
        `exports.get${name} = async (req, res) => {\n` +
        `    // TODO: Implement ${name} retrieval logic\n` +
        `};\n\n` +
        `exports.create${name} = async (req, res) => {\n` +
        `    // TODO: Implement ${name} creation logic\n` +
        `};\n\n` +
        `exports.update${name} = async (req, res) => {\n` +
        `    // TODO: Implement ${name} update logic\n` +
        `};\n\n` +
        `exports.delete${name} = async (req, res) => {\n` +
        `    // TODO: Implement ${name} deletion logic\n` +
        `};\n`;

    const routeContent = `const express = require('express');\n` +
        `const router = express.Router();\n` +
        `const ${name}Controller = require('../controllers/${name}Controller');\n\n` +
        `router.get('/', ${name}Controller.get${name});\n` +
        `router.post('/', ${name}Controller.create${name});\n` +
        `router.put('/:id', ${name}Controller.update${name});\n` +
        `router.delete('/:id', ${name}Controller.delete${name});\n\n` +
        `module.exports = router;\n`;

    const modelContent = `const mongoose = require('mongoose');\n\n` +
        `const ${name}Schema = new mongoose.Schema({\n` +
        `    // TODO: Define the ${name} schema\n` +
        `});\n\n` +
        `const ${name} = mongoose.model('${name}', ${name}Schema);\n` +
        `module.exports = ${name};\n`;

    // Create directories if they do not exist
    const createDirIfNotExists = (dir) => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    };

    createDirIfNotExists(path.join(__dirname, 'controllers'));
    createDirIfNotExists(path.join(__dirname, 'models'));
    createDirIfNotExists(path.join(__dirname, 'routes'));

    // Write the controller file
    fs.writeFileSync(path.join(__dirname, 'controllers', `${name}Controller.js`), controllerContent);
    console.log(`Created ${name}Controller.js`);

    // Write the route file
    fs.writeFileSync(path.join(__dirname, 'routes', `${name}Routes.js`), routeContent);
    console.log(`Created ${name}Routes.js`);

    // Write the model file
    fs.writeFileSync(path.join(__dirname, 'models', `${name}.js`), modelContent);
    console.log(`Created ${name}.js`);
});

console.log("All pages setup complete.");
