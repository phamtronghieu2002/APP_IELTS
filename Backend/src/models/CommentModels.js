const { ref } = require('joi');
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            require: true,
            ref: 'User',
        },
        test_id: {
            type: String,
            required: true,
            ref: 'Tests',
        },
        likes: {
            type: Array,
            require: false,
            default: [],

        },
        content: {
            type: String,
            require: true,
            default: '',
        },
        replies: {
            type: Array,
            require: false,
            default: [],
            ref: 'Comments',
        },
        is_root: {
            type: Boolean,
            require: false,
            default: true,
        },



    },
    { timestamps: true },
    { versionKey: false },
);

module.exports = mongoose.model('Comments', CommentSchema);
