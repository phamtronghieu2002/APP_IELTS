import express from "express";
const Router = express.Router();
import uploadFile from "~/middlewares/upload";

Router.post("/upload", uploadFile?.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }
    res.send({ message: "File uploaded successfully", file: req.file });
});
export default Router;