const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema(
    {
        contents: {
            type: String,
            require: false,
        },
        cate_id: {
            type: String,
            required: true,
            ref: 'Categories',
        }
    },
    { timestamps: true },
    { versionKey: false },
);

module.exports = mongoose.model('Abouts', AboutSchema);
