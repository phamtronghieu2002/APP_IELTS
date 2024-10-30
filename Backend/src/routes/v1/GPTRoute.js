import express from 'express';
import axios from 'axios';
import env from '~/config/env';
import ApiError from '~/utils/ApiError';
const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const Router = express.Router();

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

export default Router;
