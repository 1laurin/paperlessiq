const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
    // TODO: Define the Home schema
});

const Home = mongoose.model('Home', HomeSchema);
module.exports = Home;
