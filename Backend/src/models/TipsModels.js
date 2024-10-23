const mongoose = require('mongoose');

const TipSchema = new mongoose.Schema(
    {    
        // {
        //     name_tip:1212
        //     id_tip:"123"
        //     content:"content"
        // }
        contents: {
            type: Array,
            require: true,
        },
        cate_id : {
            type: String,
            required: true,
            ref: 'Categories',
        }
    },
    { timestamps: true },
    { versionKey: false },
);

module.exports = mongoose.model('Tips', TipSchema);
