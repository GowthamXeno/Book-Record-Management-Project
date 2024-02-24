const express = require("express");
const { DbConnection } = require("./DataConnection.js");
const dotenv = require("dotenv");

const RouteUser = require("./Routes/users");
const RouteBook = require("./Routes/book.js");

const app = express();
dotenv.config();
app.use(express.json());

DbConnection();
const port = 8082;

app.use("/users", RouteUser);
app.use("/books", RouteBook);

http: app.get("/", (request, response) => {
  response.json({
    server: "Connected Succesfully",
    connected_to: "8082",
  });
});

app.get("*", (request, response) => {
  response.status(404).json({
    message: "Route Doesn't Exists!",
  });
});

app.listen(port, () => {
  console.log(`Server Started Running on port ${port}`);
});
