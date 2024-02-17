const express = require("express");
const {books} = require("../Data/books.json");
const {users} = require("../Data/user.json");
const router = express.Router();


//Get all Books
router.get("/",(request,response)=>{
    response.status(200).json({
        success:true,
        message:"Here is the Books",
        data:books
    });
});


//Get The Book Issued
router.get("/issued",(req,res)=>{
    const GetIssuedBooks = users.filter((each)=>each.issuedBook) //It will send true if the Issued Attribute exits
    const booksissued = [];
    GetIssuedBooks.forEach((issuedUsers)=>{
        const book = books.find((each)=>each.id === issuedUsers.issuedBook)
        book.issuedByUser = issuedUsers.name,
        book.issuedDate = issuedUsers.issuedDate,
        book.ReturnDate = issuedUsers.returnDate,
        console.log(book);
        booksissued.push(book);
    })
    if(GetIssuedBooks.length === 0 )
        return res.status(404).json({
          success: false,
          message: "No Book Have Been Issued Yet.."
        });
    return res.status(200).json({
        success:true,
        message:"User with Issued Books...",
        books:booksissued
    });

});

//Get all Books By their ID
router.get("/:id",(request,response)=>{
    const { id } = request.params
    const bookbyid = books.find((each)=> each.id === id)
    if(!bookbyid)
        return response.status(404).json({
            success:false,
            message:"Book Not Found!"
        })
    return response.status(202).json({
        success:true,
        message:"Book Found By their ID",
        book:bookbyid
    })
})

module.exports = router;
