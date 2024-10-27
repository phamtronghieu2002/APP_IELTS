const { create_access_token } = require("~/utils/jwt");
const UserModel = require("../models/UsersModel");
const register = async ({
  user_id,
  email,
  phonenumber,
  displayname,
  avatarPicture,
}) => {
   
  console.log('====================================');
  console.log("user_id", user_id);
  console.log('====================================');
  // nếu có user_id thì update user
  if (user_id) {
    const user = await
      UserModel
        .findByIdAndUpdate(user_id, {
          email,
          phonenumber,
          displayname,
          avatarPicture,
        }, { new: true });
    return {
      data: user,
      message: "User updated successfully",
      errCode: 0,
    }
  }
  const newUser = new UserModel({
    email,
    phonenumber,
    displayname,
    avatarPicture,
  });

  const res = await newUser.save()
  const token = create_access_token({ userid: res._id }, "30d")
  const user = res.toObject();
  user.accessToken = token;
  return {
    data: user,
    message: "User created successfully",
    errCode: 0,
  }




};
const getProfile = async (userId) => {
  return {
    data: await UserModel.findById(userId),
    message: "User found",
  }

}
const login = async (data) => {



};


module.exports = {
  register,
  login,
  getProfile
};
