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

Router.post('/speaking', async (req, res, next) => {
    const { topic, text } = req.body; // Nhận đề bài và bài viết từ client

    try {
        // Tạo nội dung yêu cầu cho Google AI
        const requestBody = {
            contents: [
                {
                    parts: [
                        {
                            text: `Đề bài: "${topic}"\n\nBài speaking: "${text}"\n\nYêu cầu gồm các phần chính sau:
                            1. Chỉ ra các lỗi ngữ pháp, từ vựng và cấu trúc câu.
                            2. Cung cấp giải pháp chi tiết để cải thiện bài speaking.
                            3. Chấm điểm bài speaking theo thang điểm IELTS.
                            4. Trả kết quả dạng HTML,CSS thật đẹp,chuyên nghiệp  gồm 4 mục lớn mỗi mục cần phần làm 1 cách chi tiết
                            -Phần ngữ pháp
                            -Phần từ vựng
                            -Phần cấu trúc câu
                            -Phần chấm điểm IELTS
                            -Phần phát âm
                            -Các phần khác nếu cần thiết
                            Để hiển thị trên  reactnative webview
                            `
                        }
                    ]
                }
            ]
        };

        // Gọi Google AI API
        const response = await axios.post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' + env.GOOGLE_API_KEY,
            requestBody,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        // Trả về kết quả phân tích cho client
        return res.status(200).json({
            data: response.data.candidates[0].content.parts[0].text,
            message: 'Success',
            errCode: 0
        });
    } catch (error) {
        // Xử lý lỗi và trả về cho client
        next(new ApiError(500, error.message, error.stack));
    }
});

export default Router;
