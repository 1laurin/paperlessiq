const mongoose = require('mongoose');

const SearchSchema = new mongoose.Schema({
    // TODO: Define the Search schema
});

const Search = mongoose.model('Search', SearchSchema);
module.exports = Search;
