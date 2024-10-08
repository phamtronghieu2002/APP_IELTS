const { array, ref } = require('joi');
const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema(
    {
        question_text: {
            type: String,
            require: false,
        },

        description: {
            type: String,
            require: false,
            default: "",
        },
        video_url: {
            type: String,
            require: false,
        },
        audio_url: {
            type: String,
            require: false,
        },
        model_answer: {
            type: String,
            require: true,
        },
        correct_answer: {
            type: String,
            require: false,
            default: "",
        },
        // {
        //     "questionId": "unique_question_id",
        //     "questionText": "Câu hỏi 1?",
        //     "options": [
        //       { "optionId": "1", "text": "Đáp án A", "isCorrect": false },
        //       { "optionId": "2", "text": "Đáp án B", "isCorrect": true },
        //       { "optionId": "3", "text": "Đáp án C", "isCorrect": false },
        //       { "optionId": "4", "text": "Đáp án D", "isCorrect": false }
        //     ]
        //     "explain": "Giải thích câu hỏi 1",
        //   },
        questions: {
            type: Array,
            require: false,
            default: [],
        },
        test_id: {
            type: String,
            require: true,
            ref: 'Tests',
        },
        total_question: {
            type: Number,
            required: false,
            default: 1,
        }
    },
    { timestamps: true },
    { versionKey: false },
);

module.exports = mongoose.model('Questions', QuestionSchema);
