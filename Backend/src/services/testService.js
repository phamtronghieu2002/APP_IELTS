
import TestResultModel from '~/models/TestResultModel.js';
import testModel from '../models/TestsModel.js';
import CategoriesModel from '~/models/CategoriesModel.js';
import LessonModel from '~/models/LessonModel.js';

const addtest = async (test) => {
    const newtest = new testModel(test);
    return {
        data: await newtest.save(),
        message: "test created successfully",
        errCode: 0,
    };
};

const deleteTest = async (id) => {
    await TestResultModel.deleteMany({ test_id: id });
    const test = await testModel.findById(id).populate('questions').exec();
    const total_question = test.questions[0]?.total_question || 0;
    const cate_id = test.cate_id;
    await CategoriesModel.findByIdAndUpdate(cate_id, { $inc: { total_question: -total_question } }, { new: true });
    await LessonModel.updateMany({ tests: id }, { $pull: { tests: id }, $inc: { total_question: -total_question } });
    return {
        data: await testModel.findByIdAndDelete(id),
        message: "test deleted successfully",
        errCode: 0,
    };
}

const updateTest = async (id, data) => {
    // find by id and update one field
    return {
        data: await testModel.findByIdAndUpdate(id, data,
            {
                new: true,
            }),
        message: "test updated successfully",
        errCode: 0,
    };

}

const addQuestionTest = async (data) => {
    // find by id and update one field
    const { id, question } = data;



    return {
        data: await testModel.findByIdAndUpdate(id, {
            $push: { questions: question }
        },
            {
                new: true,
            }),
        message: "question added successfully",
        errCode: 0,
    };

}
const deleteQuestionTest = async (data) => {
    const {
        questionId,
        testId
    } = data;

    return {
        data: await testModel.findByIdAndUpdate
            (testId, {
                $pull: { questions: questionId }
            },
                {
                    new: true,
                }),
        message: "question deleted successfully",
        errCode: 0,
    };
}

const getAllTest = async () => {
    return {
        data: await testModel.find().populate('questions')?.exec(),
        message: "get all test successfully",
        errCode: 0,
    };
}

const getTestById = async (id) => {
    return {
        data: await testModel.findById(id).populate('questions')?.exec(),
        message: "get test by id successfully",
        errCode: 0,
    };
}




module.exports = {
    addtest,
    deleteTest,
    updateTest,
    addQuestionTest,
    getAllTest,
    getTestById,
    deleteQuestionTest
}