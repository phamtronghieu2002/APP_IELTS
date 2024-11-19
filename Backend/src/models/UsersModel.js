const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      min: 3,
      max: 20,
      default: "",
    },
    phonenumber: {
      type: String,
      max: 11,
      default: "",
      // unique: true,
    },
    displayname: {
      type: String,
      min: 6,
      default: "",
    },
    avatarPicture: {
      type: String,
      default: "https://didongviet.vn/dchannel/wp-content/uploads/2023/08/galaxy-huyen-bi-hinh-nen-iphone-12-pro-max-didongviet-2-576x1024.jpg"
    },
    freshToken: {
      type: String,
      default: "",
    },
    deviceid: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);