const mongoose = require('mongoose');

const ToturialSchema = new mongoose.Schema(
    {

        contents: {
            type: String,
            require: true,
            default: ""
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

module.exports = mongoose.model('Toturials', ToturialSchema);
