const mongoose = require('mongoose')

const schema = new mongoose.Schema({
   author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
  title: {
    type: String,
    minlength: 5
  },
  published: {
    type: Number,
  },
  genres: [String]
})


module.exports = mongoose.model('Book', schema)