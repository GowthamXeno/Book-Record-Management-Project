
class IssuedBook{
    _id;
    name;
    author;
    genre;
    price;
    publisher;
    issuedBy;
    issueDate;
    returnDate;

    constructor(user){
        this._id = user.issuedBook.id;
        this.name = user.issuedBook.name;
        this.author = user.issuedBook.author;
        this.genre = user.issuedBook.genre;
        this.price = user.issuedBook.price;
        this.publisher = user.issuedBook.publisher;
        this.issuedBy = user.name;
        this.issueDate = user.issueDate;
        this.returnDate = user.returnDate;
    }
}

module.imports = IssuedBook;