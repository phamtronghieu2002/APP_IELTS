const mongoose = require('mongoose');

const PrivacyAndTermSchema = new mongoose.Schema(
    {
        contents: {
            type: String,
            require: false,
        },
        type: {
            type: String,
            required: true,
            enum: ['privacy', 'term'],
        }
    },
    { timestamps: true },
    { versionKey: false },
);

module.exports = mongoose.model('PrivacyAndTerms', PrivacyAndTermSchema);
