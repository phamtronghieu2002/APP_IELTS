const mongoose = require('mongoose');

const StaticSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            require: false,
            min: 3,
            max: 20,
        },
        password: {
            type: String,
            required: false,
            min: 6,
        },
        phone: {
            type: String,
            require: false,
        },
        avatarpicture: {
            type: String,
            default:
                'https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-2.jpg',
        },
        birth: {
            type: Date,
            default: new Date('1999-01-01'),
        },
        gender: {
            type: Number,
            default: 0,
        },
        displayName: {
            type: String,
            default: 'Clone User',
        },
        createdAt: {
            type: Date,
            default: '2021-01-01',
        },
        updateAt: {
            type: Date,
            default: '2021-01-01',
        }
    },
    { timestamps: true },
    { versionKey: false },
);

module.exports = mongoose.model('Statistic', StaticSchema);
