const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
 title: {
  type: String,
  required: true,
  minlength: 2,
  maxlength: 255
 },
 content: {
  type: String,
  required: true,
  minlength: 2,
  maxlength: 500
 },
 author: {
  type: String,
  required: true,
  minlength: 2,
  maxlength: 100
 }
});

module.exports = mongoose.model('Post', PostSchema);