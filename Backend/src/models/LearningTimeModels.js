const mongoose = require('mongoose');

const LearningTimeSchema = new mongoose.Schema(
    {
        time: {
            type: Date,
            require: false,
        },
        user_id: {
            type: String,
            required: true,
            ref: 'Categories',
        },
        date: {
            type: Date,
            required: true,

        },
        minutes: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    { timestamps: true },
    { versionKey: false },
);

module.exports = mongoose.model('LearningTimes', LearningTimeSchema);
