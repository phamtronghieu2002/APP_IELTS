
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
        lesson_id: {
            type: String,
            require: true,
            ref: 'Lesson',
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
