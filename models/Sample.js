const mongoose = require('mongoose');

const podcastSchema = new mongoose.Schema({
  "name": {type:String},
  "description": {type:String}, 
  "url": {type:String},
},{collection:"samples"});



module.exports =  mongoose.model('podcastSchema', podcastSchema);

