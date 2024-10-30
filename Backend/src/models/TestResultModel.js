
const mongoose = require('mongoose');

const TestResultSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            require: true,
            ref: 'User',
        },
 
        test_id: {
            type: String,
            require: true,
            ref: 'Tests',
          
        },
        total_correct: {
            type: Number,
            require: false,
            default: 0,
        },
        total_incorrect: {
            type: Number,
            require: false,
            default: 0,
        },
        percent_test_correct:{
            type: Number,
            require: false,
            default: 0,
        },
        anwsers: {
            type: Array,
            require: false,
            default: [],
        },
    },
    { timestamps: true },
    { versionKey: false },
);

module.exports = mongoose.model('TestResuts', TestResultSchema);
