const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    test: {type: String, require: true}
})

module.exports = mongoose.model('test', testSchema)