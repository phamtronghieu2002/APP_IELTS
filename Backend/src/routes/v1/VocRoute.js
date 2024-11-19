import express from 'express'
import VocModel from '../../models/Vocabulary'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
const Router = express.Router()


Router.post('/', async (req, res, next) => {
    const data = req.body
    try {
        const voc = new VocModel(data)
        const result = await voc.save()
        return res.status(StatusCodes?.CREATED).json({
            message: 'Vocabulary created successfully',
            data: result,
            errCode: 0
        })
    } catch (error) {
        return next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack));
    }
})

// get từ vựng theo test_id// get từ vựng theo test_id
Router.get('/test/:test_id', async (req, res, next) => {
    const { test_id } = req.params;
    const { keyword } = req.query;

    try {
        // Initialize search condition with test_id
        const searchCondition = { test_id: test_id };

        // Add the regex search only if 'keyword' is provided and is a string
        if (keyword && typeof keyword === 'string') {
            searchCondition.$or = [
                { name_voc: { $regex: keyword, $options: 'i' } },
                { type_voc: { $regex: keyword, $options: 'i' } },
                { pronun_voc: { $regex: keyword, $options: 'i' } },
                { meaning_voc: { $regex: keyword, $options: 'i' } },
                { exm_voc: { $regex: keyword, $options: 'i' } },
                { explain_voc: { $regex: keyword, $options: 'i' } },
                { img_voc: { $regex: keyword, $options: 'i' } },
                { sound_voc: { $regex: keyword, $options: 'i' } }
            ];
        }

        // Execute the search in MongoDB
        const results = await VocModel.find(searchCondition);

        // Return the results to the client
        res.json({
            data: results,
            message: 'Get Vocabulary successfully',
            errCode: 0
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});


// sửa
Router.put('/:id', async (req, res, next) => {
    const { id } = req.params
    const data = req.body
    try {
        const result = await VocModel.findByIdAndUpdate
            (id
                , data
                , { new: true })
        return res.status(StatusCodes.OK).json({
            data: result,
            message: 'Update Vocabulary successfully',
            errCode: 0
        })
    } catch (error) {
        return next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack));
    }
}
)
// xóa
Router.delete('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        const result = await VocModel.findByIdAndDelete(id)
        return res.status(StatusCodes.OK).json({
            data: result,
            message: 'Delete Vocabulary successfully',
            errCode: 0
        })
    } catch (error) {
        return next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack));
    }
}
)

export default Router
