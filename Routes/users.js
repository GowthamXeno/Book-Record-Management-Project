const express = require("express");
const router = express.Router();
const { users } = require("../Data/user.json");
const {
  GetAllUsers,
  GetUserById,
  CreateNewUser,
  DeleteUser,
  UpdateUserById,
  SubscriptionDetails
} = require("../Controllers/user-controller");
// const {Router} = express;
// const router  = Router();

//From the server it is redirected here with
//The Url Is http://localhost:8082/users
//now we need tell the path after the users

//Get All Users
// router.get("/", (request, response) => {
//   response.status(200).json({
//     Success: true,
//     message:"Here is the User List:",
//     data: users,
//   });
// });
router.get("/", GetAllUsers);

//Subscription Details
// router.get("/subscription-details", (req, res) => {
//   const { id } = req.query;
//   const user = users.find((each) => each.id === id);
//   if (!user)
//     return res.status(404).json({
//       success: false,
//       message: "User Not Found!",
//     });

//   //MM/DD/YYYY
//   function DateInDays(data = "") {
//     let date;
//     if (data === "") date = new Date();
//     else date = new Date(data);
//     let days = Math.floor(date / (1000 * 60 * 60 * 24));
//     return days;
//   }
//   function SubsciptionExpiryDate(date) {
//     if (user.subscriptionType === "Basic") date += 90;
//     else if (user.subscriptionType === "Standard") date += 180;
//     else if (user.subscriptionType === "Premium") date += 360;
//     return date;
//   }

//   let CurrentDate = DateInDays();
//   let ReturnDate = DateInDays(user.returnDate);
//   let SubscriptionStartDate = DateInDays(user.subscriptionDate);
//   let SubsciptionEndDate = SubsciptionExpiryDate(SubscriptionStartDate);

//   // console.log(CurrentDate);
//   // console.log(ReturnDate);
//   // console.log(SubscriptionStartDate);
//   // console.log(SubsciptionEndDate);
//   const datas = {
//     ...user,
//     Is_Subscription_Expired: SubsciptionEndDate < CurrentDate,
//     Subscription_Expiries_In:
//       SubsciptionEndDate < CurrentDate ? 0 : SubsciptionEndDate - CurrentDate,
//     Fine:
//       ReturnDate < CurrentDate
//         ? SubsciptionEndDate < CurrentDate
//           ? 150
//           : 50
//         : 0,
//   };
//   return res.status(200).json({
//     success: true,
//     message: "The Subscription Details :",
//     data: datas,
//   });
// });
router.get("/subscription-details", SubscriptionDetails);


//Get User By ID
// router.get("/:id", getid);
// function getid(request, response) {
//   const Userid = request.params.id;
//   // const { id } = request.params;
//   // console.log(request.params);
//   const user = users.find((each) => {
//     return each.id === Userid;
//   });
//   if (!user) {
//     return response.status(404).json({
//       success: false,
//       message: "User Not Found!",
//     });
//   } else {
//     response.status(200).json({
//       success: true,
//       message: "User Found!",
//       data: user,
//     });
//   }
// }
router.get("/:id", GetUserById);

//Create New User
// router.post("/", (request, response) => {
//   const { id, name, surname, email, subscriptionType, subscriptionDate } =
//     request.body;
//   const user = users.find((each) => each.id === id);
//   if (user) {
//     return response.status(403).json({
//       success: false,
//       message: "User Already Exists!",
//     });
//   }
//   users.push({
//     id,
//     name,
//     surname,
//     email,
//     subscriptionType,
//     subscriptionDate,
//   });
//   return response.status(202).json({
//     success: true,
//     message: "User Created Successfully!",
//     data: users,
//   });
// });
router.post("/", CreateNewUser);


//Update User By ID
// router.post("/:id", (request, response) => {
//   const { id } = request.params;
//   const { data } = request.body;
//   const user = users.find((each) => {
//     return each.id === id;
//   });
//   if (!user) {
//     return response.status(403).json({
//       success: false,
//       message: "User Not Found!",
//     });
//   }
//   //this code is for modifying the particular user object alone
//   // const ModifiedUser = Object.assign({},user,data);
//   // console.log(ModifiedUser);
//   // const duplicate = users.map(each => {
//   //   if(ModifiedUser.id === each.id){
//   //     return ModifiedUser
//   //   }
//   //     return each
//   // })
//   // console.log("The Modified User Details array:",duplicate);

//   const updateduser = users.map((each) => {
//     if (each.id === id) {
//       return {
//         ...user,
//         ...data,
//       };
//     }
//     return each;
//   });
//   console.log(updateduser);
//   // users = ModifiedUser;
//   response.status(202).json({
//     success: true,
//     message: "User Updated Successfully!",
//     data: updateduser,
//   });
// });
router.post("/:id", UpdateUserById);

//Delete User By ID
// router.delete("/:id", (request, respone) => {
//   const { id } = request.params;
//   const user = users.find((each) => each.id === id);
//   if (!user) {
//     return respone.status(404).json({
//       success: false,
//       message: "User Not Found!",
//     });
//   }
//   const userindex = users.indexOf(user);
//   users.splice(userindex, 1);
//   respone.status(202).json({
//     success: true,
//     message: "User Deleted Successfully!",
//     data: users,
//   });
// });
router.delete("/:id", DeleteUser);

module.exports = router;
