const express = require("express");
const { books } = require("../Data/books.json");
const { users } = require("../Data/user.json");
const router = express.Router();

//Get all Books
router.get("/", (request, response) => {
  response.status(200).json({
    success: true,
    message: "Here is the Books",
    data: books,
  });
});

//Get The Book Issued
router.get("/issued", (req, res) => {
  const GetIssuedBooks = users.filter((each) => each.issuedBook); //It will send true if the Issued Attribute exits
  const booksissued = [];
  GetIssuedBooks.forEach((issuedUsers) => {
    const book = books.find((each) => each.id === issuedUsers.issuedBook);
    (book.issuedByUser = issuedUsers.name),
      (book.issuedDate = issuedUsers.issuedDate),
      (book.ReturnDate = issuedUsers.returnDate),
      console.log(book);
    booksissued.push(book);
  });
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
});

//Get all Books By their ID
router.get("/:id", (request, response) => {
  const { id } = request.params;
  const bookbyid = books.find((each) => each.id === id);
  if (!bookbyid)
    return response.status(404).json({
      success: false,
      message: "Book Not Found!",
    });
  return response.status(202).json({
    success: true,
    message: "Book Found By their ID",
    book: bookbyid,
  });
});

//Update Book By their ID
router.put("/", (req, res) => {
  const { id } = req.query;
  const { data } = req.body;

  const Book = books.find((each) => each.id === id);
  if (!Book)
    return res.status(404).json({
      success: false,
      message: "Book Not Found For this ID",
    });
  const UpdatedBookLists = books.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  return res.status(201).json({
    success: true,
    message: "Book Got Updated!",
    data: UpdatedBookLists,
  });
});

//Add a new Book
router.post("/", (request, response) => {
  const { data } = request.body;
    if(!data)
        return response.status(404).json({
            success: false,
            message: "No Data To Add a Book!",
        });
    const book = books.find((each)=> each.id === data.id);
    if(book)
        return response.status(404).json({
            success:false,
            message:"ID already Exists!!!..."
        });

    // const UpdatedBookLists = {...books,...data};
    const UpdatedBookLists = books;
    UpdatedBookLists.push(data)

    return response.status(201).json({
            success:true,
            message:"New Book is Added Successfully!",
            data:UpdatedBookLists
        })
    
    
});

module.exports = router;
