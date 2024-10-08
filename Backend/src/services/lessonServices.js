
import lessonModel from '../models/LessonModel.js';
import testModel from '../models/TestsModel.js';
const addlesson = async (lesson) => {
    const newlesson = new lessonModel(lesson);
    return {
        data: await newlesson.save(),
        message: "Lesson created successfully",
        errCode: 0,
    };
};

const getLessonsByCateId = async (cate_id) => {
    const lessons = await lessonModel.find({ cate_id: cate_id }).populate('cate_id').populate('tests').exec();
    lessons?.forEach(lesson => {
        let count_total_correct = 0;
        lesson.tests?.forEach(test => {
                count_total_correct += test.total_correct;
           
        });
        lesson.percent_correct = (count_total_correct / lesson.total_question) * 100;
    });
     
    return {
        data: lessons,
        message: "Get Lessons successfully",
        errCode: 0,
    };
};

const addTest = async (id, data) => {
    const test_id = data?.test;
    const test = await testModel?.findById(test_id)?.populate('questions').exec();
    const testObject = test?.toObject();
    const count_question = testObject?.questions[0]?.total_question;

    const result = await lessonModel.findOneAndUpdate({ _id: id }, { $push: { tests: test_id }, $inc: { total_question: count_question } }, { new: true });
    return {
        data: result,
        message: "question created successfully",
        errCode: 0,
    };


}
module.exports = {
    addlesson, getLessonsByCateId, addTest
}