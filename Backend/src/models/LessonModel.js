const { ref } = require('joi');
const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema(
    {
        name_lesson: {
            type: String,
            require: false,
        },
        total_question: {
            type: Number,
            required: false,
            default: 0,
        },
        percent_correct: {
            type: Number,
            require: false,
            default: 0,

        },
        cate_id: {
            type: String,
            required: true,
            ref: 'Categories',
        },
        tests: {
            type: Array,
            require: false,
            ref: 'Tests',
            default: [],
        }
    },
    { timestamps: true },
    { versionKey: false },
);

module.exports = mongoose.model('Lesson', LessonSchema);
