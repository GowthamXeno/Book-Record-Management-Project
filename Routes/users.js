const express = require("express");
const router = express.Router();
const {users} = require("../Data/user.json");
// const {Router} = express;
// const router  = Router();


//From the server it is redirected here with
//The Url Is http://localhost:8082/users
//now we need tell the path after the users
router.get("/", (request, response) => {
  response.status(200).json({
    Success: true,
    data: users,
  });
});

router.get("/:id", getid);

function getid(request, response) {
  const Userid = request.params.id;
  // const { id } = request.params;
  // console.log(request.params);
  const user = users.find((each) => {
    return each.id === Userid;
  });
  if (!user) {
    return response.status(404).json({
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

router.post("/", (request, response) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    request.body;
  const user = users.find((each) => each.id === id);
  if (user) {
    return response.status(403).json({
      success: false,
      message: "User Already Exists!",
    });
  }
  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });
  return response.status(202).json({
    success: true,
    message: "User Created Successfully!",
    data: users,
  });
});

router.post("/:id", (request, response) => {
  const { id } = request.params;
  const { data } = request.body;
  const user = users.find((each) => {
    return each.id === id;
  });
  console.log(user);
  if (!user) {
    return response.status(403).json({
      success: false,
      message: "User Not Found!",
    });
  }
  //this code is for modifying the particular user object alone
  // const ModifiedUser = Object.assign({},user,data);
  // console.log(ModifiedUser);
  // const duplicate = users.map(each => {
  //   if(ModifiedUser.id === each.id){
  //     return ModifiedUser
  //   }
  //     return each
  // })
  // console.log("The Modified User Details array:",duplicate);

  const updateduser = users.map((each) => {
    if (each.id === id) {
      return {
        ...user,
        ...data,
      };
    }
    return each;
  });
  console.log(updateduser);
  // users = ModifiedUser;
  response.status(202).json({
    success: true,
    message: "User Updated Successfully!",
    data: updateduser,
  });
});

router.delete("/:id", (request, respone) => {
  const { id } = request.params;
  const user = users.find((each) => each.id === id);
  console.log(user);
  if (!user) {
    return respone.status(404).json({
      success: false,
      message: "User Not Found!",
    });
  }
  const userindex = users.indexOf(user);
  users.splice(userindex, 1);
  respone.status(202).json({
    success: true,
    message: "User Deleted Successfully!",
    data: users,
  });
});


module.exports = router;
