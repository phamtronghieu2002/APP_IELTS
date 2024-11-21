import express from "express";
const Router = express.Router();
import uploadFile from "~/middlewares/upload";
import { cloudinary } from "./GPTRoute";
Router.post("/upload", uploadFile?.single("image"), async (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }
    const result = await cloudinary.uploader.upload(req.file.path)
    console.log("result >", result);


    res.send({ message: "File uploaded successfully", url: result?.secure_url});
});
export default Router;