import express from "express";
const Router = express.Router();
import uploadFile from "~/middlewares/upload";
var ffmpeg = require('ffmpeg');
import { cloudinary } from "./GPTRoute";
Router.post("/upload", uploadFile?.single("audio"), async (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }
    const result = await cloudinary.uploader.upload(req.file.path, { resource_type: "video" })

    res.send({ message: "File uploaded successfully", url: result?.secure_url });
});


Router.post("/uploadMobile", uploadFile?.single("audio"), (req, res) => {

    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }
    //convert to mp3
    console.log('====================================');
    console.log("patch", req.file.path);
    console.log('====================================');
    var process = new ffmpeg(req.file.path);
    process.then(function (audio) {
        audio.fnExtractSoundToMP3(req.file.path + ".mp3", function (error, file) {
            if (!error)
                console.log('Audio file: ' + file);
        });
    }, function (err) {
        console.log('Error: ' + err);
    });


    res.send({ message: "File uploaded successfully", file: req.file });
});
export default Router;