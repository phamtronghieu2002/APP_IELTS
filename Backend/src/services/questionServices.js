
import questionModel from '../models/QuestionsModel.js';
import lessonModel from '../models/LessonModel.js';
import CategoriesModel from '~/models/CategoriesModel.js';

const addQuestion = async (data) => {
    const question_id = data?.question_id;
    const lesson_id = data?.lesson_id;

    // Tìm document với question_id
    let is_fill_in_blank = false;
    if (question_id) {
        const existingQuestionDoc = await questionModel.findOne({ _id: question_id || "" });

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


            const cate_id = lesson.cate_id;
            // tăng total_question của cate_id

            await CategoriesModel.findByIdAndUpdate(cate_id, { $inc: { total_question: is_fill_in_blank ? count_question_fill_in_blank : existingQuestionIndex !== -1 ? 0 : 1 } }, { new: true });


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

    }
    // Nếu không tìm thấy document, tạo câu hỏi mới
    const newQuestion = new questionModel({
        ...data
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

const updateQuestionById = async (question_id, data) => {


    try {
        // Tìm document dựa vào test_id và questionId, sau đó cập nhật
        const result = await questionModel.findByIdAndUpdate(
            { _id: question_id, }, data
            ,
            { new: true } // Tùy chọn để trả về document đã cập nhật
        );

        return {
            data: result,
            message: "question updated successfully",
            errCode: 0,
        }; // Trả về kết quả cập nhật
    } catch (error) {
        console.error('Error updating question and other fields:', error);
        throw new Error('Could not update question and other fields');
    }
};

const deleteQuestion = async (question_id, sub_q, lesson_id) => {
    try {

        const sub_id = sub_q?.question_id;
        const countDelete = sub_q?.question_type == "fill_in_blank" ? sub_q?.options?.length : 1;
      
        const result = await questionModel.updateOne(
            { _id: question_id },
            {
                $pull: {
                    questions: { question_id: sub_id }
                },
                $inc: { total_question: - countDelete }
            },
            { new: true }
        );
        // giảm đi số câu hỏi của cate_id
        const lesson = await lessonModel.findById(lesson_id)
            .populate({
                path: 'tests',
                populate: { path: 'questions' }
            })
            .exec();

        const cate_id = lesson.cate_id;

        let total_question = 0;
        lesson.tests.forEach(test => {
       
            total_question += test.questions[0]?.total_question || 0;
        });


        await CategoriesModel.findByIdAndUpdate(cate_id, { $inc: { total_question: -countDelete } }, { new: true });



        await lessonModel.findByIdAndUpdate(lesson_id, { total_question }, { new: true });

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
    updateQuestionById,
    deleteQuestion,
    getQuestionById
}