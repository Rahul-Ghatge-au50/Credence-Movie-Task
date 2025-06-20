const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name:{type:String},
    img:{type:String},
    summary:{type:String}
},{ timestamps: true });

module.exports = mongoose.model('Movie',movieSchema);