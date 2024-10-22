const mongoose = require('mongoose');

const VocabularySchema = new mongoose.Schema(
    {

        name_voc: {
            type: String,
            require: true,
            default: ""
        },
        type_voc: {
            type: String,
            required: true,
            enum: ['noun', 'verb', 'adjective', 'adverb', 'preposition', 'conjunction', 'interjection'],
        },
 
        pronun_voc: {
            type: String,
            required: true,
            default: ""
        },
        meaning_voc: {
            type: String,
            required: true,
            default: ""
        },
        exm_voc: {
            type: String,
            required: true,
            default: ""
        },
        img_voc: {
            type: String,
            required: true,
            default: ""
        },
        sound_voc: {
            type: String,
            required: true,
            default: ""
        },
        explain_voc: {
            type: String,
            required: true,
            default: ""
        },
        test_id: {
            type: String,
            required: true,
            ref: 'Tests',
        }
    },
    { timestamps: true },
    { versionKey: false },
);

module.exports = mongoose.model('Vocabularys', VocabularySchema);
