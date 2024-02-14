const express = require("express");
const { users } = require("./Data/user.json");

const app = express();

app.use(express.json());

const port = 8082;

app.get("/", (request, response) => {
  response.json({
    server: "Connected Succesfully",
    connected_to: "8082",
  });
});

app.get("/users", (request, response) => {
  response.status(200).json({
    Success: true,
    data: users,
  });
});

app.get("/users/:id", getid);

function getid(request, response) {
  const Userid = request.params.id;
  // const { id } = request.params;
  // console.log(request.params);
  const user = users.find((each) => {
    return each.id === Userid;
  });
  if (!user) {
    response.status(404).json({
      success: false,
      message: "User Not Found!",
    });
  } else {
    response.status(200).json({
      success: true,
      message: "User Found!",
      data: user,
    });
  }
}

app.post("/users", (request, response) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    request.body;
  const user = users.find((each) => each.id === id);
  if (user) {
    return response.status(403).json({
      success:false,
      message:"User Already Exists!"
    });
  }
  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate
  });
  return response.status(202).json({
    success:true,
    message:"User Created Successfully!",
    data:users
  })
});

app.post("/users/:id",(request,response)=>{
  const {id} = request.params;
  const { data } = request.body;
  const updateduser = users.find((each)=>{ return each.id===id});
  console.log(updateduser);

  response.status(202).json({
    success:true,
    message:"User Updated Successfully!",
    data:updateduser

  });
})

app.get("*", (request, response) => {
  response.status(404).json({
    message: "Route Doesn't Exists!",
  });
});

app.listen(port, () => {
  console.log(`Server Started Running on port ${port}`);
});
