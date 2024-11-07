import express from 'express';
import axios from 'axios';
import env from '~/config/env';
import ApiError from '~/utils/ApiError';
const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const Router = express.Router();

const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: env.DINARY_CLOUD_NAME,
    api_key: env.DINARY_CLOUD_API_KEY,
    api_secret: env.DINARY_CLOUD_API_SECRET,
});


Router.post('/writing', async (req, res, next) => {

    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-latest",
        generationConfig: { response_mime_type: "application/json" },
      });
    
    const { topic, text } = req.body; 

    const jsonSchema = {
        title: "Evaluate my answer following my topic",
        description:
          `Đề bài: "${topic}  "Bài viết: "${text}`,
        type: "array",
        items: {
          type: "object",
          properties: {
            grammar_errors: { description: "errors in grammar.", type: "string" },
            vocabulary_errors: { description: "errors in vocabulary.", type: "string" },
            sentence_structure_errors: { description: "errors in sentence structure.", type: "string" },
            coherence_errors: { description: "errors in coherence.", type: "string" },
            cohesion_errors: { description: "errors in cohesion.", type: "string" },
            detailed_solutions_to_improve_writing: { description: "detailed solutions to improve writing.", type: "string" },
            ielts_writing_score_rating: { description: "IELTS writing score rating.", type: "number" },
          },
          additionalProperties: false,
        },
      };

    try {
        const prompt = `Follow JSON schema.<JSONSchema>${JSON.stringify(
            jsonSchema
          )}</JSONSchema>`;
          const result = await model.generateContent(prompt);
          const text = await result.response.text();
          const parsedData = JSON.parse(text);
        return res.status(200).json(parsedData);
    } catch (error) {
        // Xử lý lỗi và trả về cho client
        next(new ApiError(500, error.message, error.stack));
    }
});

import uploadFile from "~/middlewares/upload";

Router.post("/speaking", async (req, res) => {


    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-latest",
        generationConfig: { response_mime_type: "application/json" },
      });
    
    const  topic  = "The Impact of Artificial Intelligence on Modern Workplaces"; 
    const url = req.body.url;

    const jsonSchema = {
        title: "Write a review of the following recording based on the criteria I specified just once.",
        description:
          `Chủ đề: "${topic}  "Đoạn ghi âm: "${url}`,
        type: "array",
        items: {
          type: "object",
          properties: {
            tone: { description: "tone on the voice recording detailed", type: "string" },
            Grammar: { description: "Grammar on the voice recording detailed", type: "string" },
            pronunciation: { description: "pronunciation on the voice recording detailed", type: "string" },
            tempo: { description: "tempo on the voice recording detailed", type: "string" },
          },
          additionalProperties: false,
        },
      };

    try {
        const prompt = `Follow JSON schema.<JSONSchema>${JSON.stringify(
            jsonSchema
          )}</JSONSchema>`;
          const result = await model.generateContent(prompt);
          const text = await result.response.text();
          const parsedData = JSON.parse(text);
        return res.status(200).json(parsedData);
    } catch (error) {
        // Xử lý lỗi và trả về cho client
        next(new ApiError(500, error.message, error.stack));
    }
});

Router.post("/upload", uploadFile?.single("audio"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
}
  try {
        
    // const result = await cloudinary.uploader.upload('./src/files/recording.mp3', 
    // { resource_type: "video" }
    // )
    const result = await cloudinary.uploader.upload(req.file.path, 
      { resource_type: "video" }
      )
    return res.status(200).json(result);
} catch (error) {
    console.log(error);
}
});

export default Router;
