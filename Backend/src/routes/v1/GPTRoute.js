import express from 'express';
import axios from 'axios';
import env from '~/config/env';
import ApiError from '~/utils/ApiError';

const Router = express.Router();

Router.post('/writing', async (req, res, next) => {
    const { topic, text } = req.body; // Nhận đề bài và bài viết từ client

    try {
        // Tạo nội dung yêu cầu cho Google AI
        const requestBody = {
            contents: [
                {
                    parts: [
                        {
                            text: `Đề bài: "${topic}"\n\nBài viết: "${text}"\n\nYêu cầu gồm các phần chính sau:
                            1. Chỉ ra các lỗi ngữ pháp, từ vựng và cấu trúc câu.
                            2. Cung cấp giải pháp chi tiết để cải thiện bài viết.
                            3. Chấm điểm bài viết theo thang điểm IELTS.
                            4. Trả kết quả dạng HTML,CSS thật đẹp,chuyên nghiệp  gồm 4 mục lớn mỗi mục cần phần làm 1 cách chi tiết
                            -Phần ngữ pháp
                            -Phần từ vựng
                            -Phần cấu trúc câu
                            -Phần chấm điểm IELTS
                            Để hiển thị trên  reactnative webview nội dung phần đánh giá riêng biệt về ngữ pháp, từ vựng và điểm số
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
