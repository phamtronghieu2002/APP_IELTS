const { ref } = require('joi');
const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema(
    {
        name_test: {
            type: String,
            require: true,
        },
 
        percent_correct: {
            type: Number,
            require: false,
            min: 0,
            max: 100,
            default: 0,
        },
        total_correct: {
            type: Number,
            required: true,
            default: 0,
        },
        total_incorrect: {
            type: Number,
            required: true,
            default: 0,
        },
        questions: {
            type: Array,
            require: false,
            ref: 'Questions',
            default: [],
        },
        is_doing: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    { timestamps: true },
    { versionKey: false },
);

module.exports = mongoose.model('Tests', TestSchema);
