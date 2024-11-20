const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({
    // TODO: Define the Register schema
});

const Register = mongoose.model('Register', RegisterSchema);
module.exports = Register;
