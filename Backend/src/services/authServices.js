const { create_access_token } = require("~/utils/jwt");
const UserModel = require("../models/UsersModel");
const register = async ({
  email,
  phonenumber,
  displayname,
  avatarPicture,
}) => {

  const newUser = new UserModel({
    email,
    phonenumber,
    displayname,
    avatarPicture,
  });

  const res = await newUser.save()
  const token = create_access_token({ userid: res._id }, "1h")
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

module.exports = {
  register,
  getProfile
};
