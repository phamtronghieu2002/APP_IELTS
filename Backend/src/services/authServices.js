const { create_access_token } = require("~/utils/jwt");
const UserModel = require("../models/UsersModel");
const register = async ({
  user_id,
  email,
  phonenumber,
  displayname,
  avatarPicture,
}) => {





  // nếu có user_id thì update user
  if (user_id || email) {

    const user = await UserModel.findOneAndUpdate(
      {
        $or: [{ _id: user_id }, { email }]
      },
      {
        email,
        phonenumber,
        displayname,
        avatarPicture
      },
      { new: true }
    );

    console.log("user ngoài ", user);

    if (user) {
      console.log("user trong đây", user);
      
      const token = create_access_token({ userid: user._id }, "30d")
      const user_fb = user.toObject();
      user_fb.accessToken = token;
      return {
        data: user_fb,
        message: "User updated successfully",
        errCode: 0
      };
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
