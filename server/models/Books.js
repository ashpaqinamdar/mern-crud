const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  hardBound: {
    type: Boolean,
    required: true,
  },
  pdf: {
    type: Boolean,
    required: true,
  },
  paperBack: {
    type: Boolean,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  coverImage: {
    type: String,
    required: false,
  },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
