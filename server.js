const express = require("express");

const app = express();

app.use(express.json());

const port = 8082;

app.get("/", (request, response) => {
  response.json({ 
    server: "Connected Succesfully",
    "connected_to":"8082"
 });
});

app.get("*",(request,response)=>{
    response.status(404).json({
        message:"Route Doesn't Exists!"
    })
})
app.listen(port, () => {
  console.log(`Server Started Running on port ${port}`);
});
