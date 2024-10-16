
import questionModel from '../models/QuestionsModel.js';
import lessonModel from '../models/LessonModel.js';

const addQuestion = async (data) => {
    const question_id = data?.question_id;
    const lesson_id = data?.lesson_id;
    
    // Tìm document với question_id
    const existingQuestionDoc = await questionModel.findOne({ _id: question_id || "" });
    
    let is_fill_in_blank = false;
    let count_question_fill_in_blank = 0;

    if (existingQuestionDoc) {
        const newQuestion = data?.questions;
        is_fill_in_blank = newQuestion?.question_type === "fill_in_blank";
        
        if (is_fill_in_blank) {
            count_question_fill_in_blank = newQuestion?.options?.length;
        }

        // Kiểm tra xem câu hỏi với `question_id` đã tồn tại trong mảng `questions` chưa
        const existingQuestionIndex = existingQuestionDoc.questions.findIndex(
            (q) => q.question_id === newQuestion.question_id
        );

        let updatedQuestions;

        if (existingQuestionIndex !== -1) {
            // Nếu đã tồn tại, cập nhật câu hỏi
            updatedQuestions = existingQuestionDoc.questions.map((q, index) =>
                index === existingQuestionIndex ? newQuestion : q
            );
        } else {
            // Nếu chưa tồn tại, push câu hỏi mới vào mảng `questions`
            updatedQuestions = [...existingQuestionDoc.questions, newQuestion];
        }

        // Cập nhật document với mảng `questions` mới và tăng số lượng câu hỏi
        const result = await questionModel.findOneAndUpdate(
            { _id: question_id },
            { 
                questions: updatedQuestions, 
                $inc: { total_question: is_fill_in_blank ? count_question_fill_in_blank : existingQuestionIndex !== -1 ? 0 : 1 } 
            },
            { new: true }
        );

        // Cập nhật `total_question` trong bảng `lessonModel`
        const lesson = await lessonModel.findById(lesson_id)
            .populate({
                path: 'tests',
                populate: { path: 'questions' }
            })
            .exec();

        let total_question = 0;
        lesson.tests.forEach(test => {
            total_question += test.questions[0]?.total_question || 0;
        });

        await lessonModel.findByIdAndUpdate(lesson_id, { total_question }, { new: true });

        return {
            data: result,
            message: "Question updated successfully",
            errCode: 0,
        };

    }

    // Nếu không tìm thấy document, tạo câu hỏi mới
    const newQuestion = new questionModel({
        ...data,
        total_question: is_fill_in_blank ? count_question_fill_in_blank : 1
    });

    return {
        data: await newQuestion.save(),
        message: "Question created successfully",
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

const getQuestionById = async (id) => {
    return {
        data: await questionModel.findById(id),
        message: "question fetched successfully",
        errCode: 0,
    };
}

module.exports = {
    addQuestion, getAllQuestions,
    updateQuestionByTestId,
    deleteQuestion,
    getQuestionById
}