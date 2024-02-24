// const mongoose = require("mongoose");

// function DbConnection() {
//   const URI = process.env.MONGODB_URI;
//   mongoose.connect(URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   });
// }
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "Connection Errors"));
// db.once("open", function () {
//   console.log("Connection Established!!!");
// });
// module.exports = DbConnection;

const mongoose = require("mongoose");

exports.DbConnection = ()=>{
  const URI = process.env.MONGODB_URI;

  mongoose.connect(URI);
}
const db = mongoose.connection;

db.on("error",console.error.bind("Connection Error!"));
db.once("open",function(){
  console.log("Connection Established!!!");
})
