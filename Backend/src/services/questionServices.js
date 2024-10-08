
import questionModel from '../models/QuestionsModel.js';

const addQuestion = async (data) => {
    const test_id = data?.test_id;
    const isExist = await questionModel.findOne({ test_id: test_id });

    if (isExist) {

        const question = data?.questions;
    

        const result = await questionModel.findOneAndUpdate({ test_id: test_id }, { $push: { questions: question }, $inc: { total_question: 1 } }, { new: false });
        return {
            data: result,
            message: "question created successfully",
            errCode: 0,
        };

    }
    const newquestion = new questionModel(data);
    return {
        data: await newquestion.save(),
        message: "question created successfully",
        errCode: 0,
    };
};

const getAllQuestions = async () => {
    return {
        data: await questionModel.find(),
        message: "questions fetched successfully",
        errCode: 0,
    };
}

const updateQuestionByTestId = async (test_id, data) => {
    const {
        question_text,
        description,
        video_url,
        audio_url,
        model_answer,
        correct_answer,
        question // Đây là object chứa thông tin câu hỏi cập nhật
    } = data;

    try {
        // Tìm document dựa vào test_id và questionId, sau đó cập nhật
        const result = await questionModel.updateOne(
            { test_id, "questions.question_id": question.question_id }, // Điều kiện tìm document theo test_id và questionId
            {
                $set: {
                    "questions.$": question,          // Cập nhật câu hỏi trong mảng
                    "question_text": question_text,    // Cập nhật nội dung bài test
                    "description": description,        // Cập nhật mô tả
                    "video_url": video_url,            // Cập nhật video URL
                    "audio_url": audio_url,            // Cập nhật audio URL
                    "model_answer": model_answer,      // Cập nhật model answer
                    "correct_answer": correct_answer   // Cập nhật câu trả lời đúng
                }
            },
            { new: true } // Tùy chọn để trả về document đã cập nhật
        );

        return result; // Trả về kết quả cập nhật
    } catch (error) {
        console.error('Error updating question and other fields:', error);
        throw new Error('Could not update question and other fields');
    }
};

const deleteQuestion = async (test_id, questionId) => {
    try {
        // Tìm document dựa vào test_id và questionId, sau đó xóa câu hỏi
        const result = await questionModel.updateOne(
            { test_id },
            {
                $pull: {
                    questions: { question_id: questionId }
                },
                $inc: { total_question: -1 }
            },
            { new: true }
        );

        return {
            data: result,
            message: "question deleted successfully",
            errCode: 0,
        }
    } catch (error) {
        console.error('Error deleting question:', error);
        throw new Error('Could not delete question');
    }
};


module.exports = {
    addQuestion, getAllQuestions,
    updateQuestionByTestId,
    deleteQuestion
}