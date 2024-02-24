const { default: mongoose } = require("mongoose");
const { UserModel, BookModel } = require("../Models");
const userModel = require("../Models/user.model");

//Get All Users
exports.GetAllUsers = async (req, res) => {
  const users = await UserModel.find();
  if (users.length === 0)
    return res.status(404).json({
      success: false,
      message: "User List is Empty!!!",
    });
  return res.status(200).json({
    success: true,
    message: "Here is the Users :",
    Users: users,
  });
};

//Get User By ID
exports.GetUserById = async (req, res) => {
  const UserId = req.params.id;

  const UserByID = await UserModel.findById(UserId);
  if (UserByID.length === 0) {
    return response.status(404).json({
      success: false,
      message: "User Not Found!",
    });
  } else {
    response.status(200).json({
      success: true,
      message: "User Found!",
      data: UserByID,
    });
  }
};

//Create New User
exports.CreateNewUser = async (req, res) => {
  const { name, surname, email, subscriptionType, subscriptionDate } = req.body;
  await UserModel.create({
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });

  const UserList = await UserModel.find();
  return res.status(202).json({
    success: true,
    message: "New User Created Successfully",
    UpdatedList: UserList,
  });
};

//Update User By Id
exports.UpdateUserById = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const { data } = req.body;
  const user = await userModel.findOne({ _id: id });
  if (user.length === 0)
    return res.status(403).json({
      success: false,
      message: "User Not Found!",
    });
  const Updateduser = await userModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return res.status(200).json({
    success: true,
    message: "User Updated Successfully",
    User: Updateduser,
  });
};

//Delete User By Id
exports.DeleteUser = async (request, response) => {
  const id = request.params.id;
  const user = await UserModel.deleteOne({ _id: id });
  if (user.deletedCount === 0)
    return response.status(404).json({
      success: false,
      message: "User Not Found!",
    });
  else
    return response.status(200).json({
      message: "Deleted SuccessFully!",
      User: user,
    });
};

//Subscription Detials
exports.SubscriptionDetails = async (req,res)=>{
    const { id } = req.query;
    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({
      success: false,
      message: "Not Valid ID!!!",
    });
  const user = await UserModel.findOne({_id:id});
  console.log(user);
  if (!user)
    return res.status(404).json({
      success: false,
      message: "User Not Found!",
    });

  //MM/DD/YYYY
  function DateInDays(data = "") {
    let date;
    if (data === "") date = new Date();
    else date = new Date(data);
    let days = Math.floor(date / (1000 * 60 * 60 * 24));
    return days;
  }
  function SubsciptionExpiryDate(date) {
    if (user.subscriptionType === "Basic") date += 90;
    else if (user.subscriptionType === "Standard") date += 180;
    else if (user.subscriptionType === "Premium") date += 360;
    return date;
  }

  let CurrentDate = DateInDays();
  let ReturnDate = DateInDays(user.returnDate);
  let SubscriptionStartDate = DateInDays(user.subscriptionDate);
  let SubsciptionEndDate = SubsciptionExpiryDate(SubscriptionStartDate);

//   console.log(CurrentDate);
//   console.log(ReturnDate);
//   console.log(SubscriptionStartDate);
//   console.log(SubsciptionEndDate);
  const datas = {
    ...user,
    Is_Subscription_Expired: SubsciptionEndDate < CurrentDate,
    Subscription_Expiries_In:
      SubsciptionEndDate < CurrentDate ? 0 : SubsciptionEndDate - CurrentDate,
    Fine:
      ReturnDate < CurrentDate
        ? SubsciptionEndDate < CurrentDate
          ? 150
          : 50
        : 0,
  };
  return res.status(200).json({
    success: true,
    message: "The Subscription Details :",
    data: datas,
  });

}