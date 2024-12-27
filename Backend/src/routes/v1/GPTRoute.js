import express from 'express';
import axios from 'axios';
import env from '~/config/env';
import ApiError from '~/utils/ApiError';
import PrivacyAndTermsModel from '~/models/PrivacyAndTermsModel';
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
export { cloudinary }

Router.post('/writing', async (req, res, next) => {


  const resC = await PrivacyAndTermsModel.findOne({ type: 'writing-modal' }).exec();
  console.log("resC.contents", resC?.contents);

  const model = genAI.getGenerativeModel({
    model: resC?.contents || "gemini-1.5-pro-002",
    generationConfig: { response_mime_type: "application/json" },
  });

  const { topic, text } = req.body;

  const jsonSchema = {
    title: "Đánh giá bài viết Ielts theo chủ đề hãy trả lời bằng tiếng việt",
    description:
      `Đề bài: "${topic}" Bài viết: "${text}"`,
    type: "array",
    items: {
      type: "object",
      properties: {
        grammar_errors: { description: "Lỗi ngữ pháp.", type: "string" },
        vocabulary_errors: { description: "Lỗi từ vựng.", type: "string" },
        sentence_structure_errors: { description: "Lỗi cấu trúc câu.", type: "string" },
        coherence_errors: { description: "Lỗi liên kết ý.", type: "string" },
        cohesion_errors: { description: "Lỗi liên kết câu.", type: "string" },
        detailed_solutions_to_improve_writing: { description: "Giải pháp chi tiết để cải thiện bài viết.", type: "string" },
        ielts_writing_score_rating: { description: "Điểm đánh giá kỹ năng viết IELTS.", type: "number" },
      },
      additionalProperties: false,
    },
  };

  try {
    const prompt = `Hãy tuân theo JSON schema.<JSONSchema>${JSON.stringify(
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

Router.post("/speaking", async (req, res, next) => {



  const resC = await PrivacyAndTermsModel.find({ type: 'speaking-modal' }).exec();
  console.log("res.contents", resC);

  const model = genAI.getGenerativeModel({
    model: resC?.contents || "gemini-1.5-flash-latest",
    generationConfig: { response_mime_type: "application/json" },
  });

  const topic = req.body.topic;

  const url = req.body.url;

  console.log('====================================');
  console.log("url >>>>>>>", url);
  console.log('====================================');
  console.log('====================================');
  console.log("topic", topic);
  console.log('====================================');
  const jsonSchema = {
    title: "Write a review of the following recording about Ielts Speaking based on the criteria I specified just once Responsve using Vietnamese please !.",
    description:
      `Chủ đề : "${topic}  "Đoạn ghi âm: "${url}`,
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
    console.log('====================================');
    console.log("parsedData", parsedData);
    console.log('====================================');
    return res.status(200).json(parsedData);
  } catch (error) {
    // Xử lý lỗi và trả về cho client
    next(new ApiError(500, error.message, error.stack));
  }
});

Router.post("/upload/dinarycloud", uploadFile?.single("audio"), async (req, res) => {
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
    console.log(
      "result >>>>>>>>>>>>>>>",
      result);


    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

export default Router;
