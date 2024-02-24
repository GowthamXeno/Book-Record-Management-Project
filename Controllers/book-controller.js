const { request } = require("express");
const { UserModel, BookModel } = require("../Models/index");
const IssuedBook = require("../DTOs/book_dto");
const bookModel = require("../Models/book.model");

//Get All Books
exports.GetAllBooks = async (req, res) => {
  const books = await BookModel.find();
  if (books.length === 0)
    return res.status(404).json({
      message: "Book List is Empty!!!",
    });
  return res.status(200).json({
    success: true,
    message: "Here is the Books",
    data: books,
  });
};

//Get Book By ID
exports.GetBookByID = async (req, res) => {
  const { id } = req.params;
  const bookbyid = await BookModel.findById(id);
  if (bookbyid.length === 0)
    return res.status(404).json({
      success: false,
      message: "Book Not Found!",
    });
  return res.status(202).json({
    success: true,
    message: "Book Found By their ID",
    book: bookbyid,
  });
};

//Get The Books Issued
exports.GetTheIssuedBooks = async (req, res) => {
  const users = await UserModel.find({
    issuedBook: { $exists: true },
  }).populate("issuedBook");
  const GetIssuedBooks = users.map((each) => new IssuedBook(each));

  if (GetIssuedBooks.length === 0)
    return res.status(404).json({
      success: false,
      message: "No Book Have Been Issued Yet..",
    });
  return res.status(200).json({
    success: true,
    message: "User with Issued Books...",
    books: booksissued,
  });
};

//Update Book by ID
exports.UpdateBookById = async (req, res) => {
  const { id } = req.query;
  const { data } = req.body;
  const BookId = await bookModel.findOne({ _id: id });
  if (BookId.length === 0)
    return res.status(404).json({
      success: false,
      message: "Id Not Found!",
    });
  try {
    const book = await bookModel.findOneAndUpdate(
      {
        _id: id,
      },
      data,
      {
        new: true,
      }
    );
    // const UpdatedBookLists = await BookModel.find();

    return res.status(201).json({
      success: true,
      message: "Book Got Updated!",
      data: book,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internet Server Error!",
      error:error.message
    });
  }
};

//Add a New Book
exports.AddNewBook = async (req, res) => {
  const { data } = req.body;
  if (!data)
    return response.status(404).json({
      success: false,
      message: "No Data To Add a Book!",
    });
  await bookModel.create(data);
  const UpdatedBookLists = await BookModel.find();
  return res.status(201).json({
    success: true,
    message: "New Book is Added Successfully!",
    data: UpdatedBookLists,
  });
};
