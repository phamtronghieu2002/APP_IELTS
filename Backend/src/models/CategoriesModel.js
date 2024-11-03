const mongoose = require('mongoose');

const CategoriesSchema = new mongoose.Schema(
    {
        name_category: {
            type: String,
            require: false,
        },
        thumb: {
            type: String,
            required: false,
        },
        desc: {
            type: String,
            require: false,
            default: 'No description',
        },
        total_progress: {
            type: Number,
            require: false,
            default: 0,
        },
        total_question: {
            type: Number,
            require: false,
            default: 0,
        },
        group: {
            type: String,
            enum: ['skills', 'practices', 'prepare'],
            require: false,
        },
        type: {
            type: String,
            enum: ['Reading', 'Speaking', 'Listening', 'Writing', 'Grammar', 'Vocabulary','About'],
            require: false,
        },

    },
    { timestamps: true },
    { versionKey: false },
);

module.exports = mongoose.model('Categories', CategoriesSchema);
