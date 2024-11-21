const mongoose = require('mongoose');

const Accountchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: false,
        },
        password: {
            type: String,
            required: true,
        }
    },
    { timestamps: true },
    { versionKey: false },
);

module.exports = mongoose.model('Account', Accountchema);
