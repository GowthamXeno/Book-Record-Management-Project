const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Books", BookSchema);
//This will Be created as a collection in our MongoDb and Bydefault it is ends with "s" and smaller letter

//example = "Book"  = books
