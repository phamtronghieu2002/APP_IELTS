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

// get từ vựng theo test_id
Router.get('/test/:test_id', async (req, res, next) => {
    const { test_id } = req.params;
    const { keyword } = req.query;

    try {
        // Xây dựng điều kiện tìm kiếm từ khóa trong tất cả các trường văn bản
        const searchCondition = {
            test_id: test_id, // Điều kiện tìm theo test_id
            $or: [
                { name_voc: { $regex: keyword, $options: 'i' } },  // Tìm theo tên
                { type_voc: { $regex: keyword, $options: 'i' } },  // Tìm theo loại từ
                { pronun_voc: { $regex: keyword, $options: 'i' } },  // Tìm theo phát âm
                { meaning_voc: { $regex: keyword, $options: 'i' } },  // Tìm theo nghĩa
                { exm_voc: { $regex: keyword, $options: 'i' } },  // Tìm theo ví dụ
                { explain_voc: { $regex: keyword, $options: 'i' } },  // Tìm theo giải thích
                { img_voc: { $regex: keyword, $options: 'i' } },  // Tìm theo link ảnh
                { sound_voc: { $regex: keyword, $options: 'i' } }  // Tìm theo link âm thanh
            ]
        };

        // Thực hiện tìm kiếm trong MongoDB
        const results = await VocModel.find(searchCondition);

        // Trả kết quả về client
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
