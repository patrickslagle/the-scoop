const mongoose = require('mongoose');

const bathroomSchema = new mongoose.Schema({
    bathroomLocation: {type: String, require: true},
    review: {type: String, require: true},
    bathroomPic: {type: String, require: true},
    coordinate: {type: Array, require: true}
})

module.exports = mongoose.model('Bathrooms', bathroomSchema)