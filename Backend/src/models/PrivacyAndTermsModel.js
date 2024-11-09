const mongoose = require('mongoose');

const PrivacyAndTermSchema = new mongoose.Schema(
    {
        contents: {
            type: mongoose.Schema.Types.Mixed,
            require: false,
        },
        type: {
            type: String,
            required: true,
            enum: ['privacy', 'term','email','notify'],
        }
    },
    { timestamps: true },
    { versionKey: false },
);

module.exports = mongoose.model('settingsApps', PrivacyAndTermSchema);
