
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

const getLessonsByCateId = async (cate_id, keyword) => {
    // Tạo điều kiện tìm kiếm chung
    let searchCondition = { cate_id: cate_id };
    console.log("keyword", keyword);

    // Nếu có keyword, thêm điều kiện tìm kiếm cho tất cả các field
    if (keyword) {
        const keywordRegex = new RegExp(keyword, 'i'); // 'i' để tìm kiếm không phân biệt hoa thường
        searchCondition = {
            cate_id: cate_id,
            $or: [
                { name_lesson: keywordRegex },
            ],
        };
    }

    // Tìm các bài học theo cate_id và keyword nếu có
    const lessons = await lessonModel.find(searchCondition).populate('cate_id').populate('tests').exec();

    // Tính toán phần trăm đúng cho mỗi bài học
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
const getLessonById = async (id) => {


    const lesson = await lessonModel.findById(id).populate('cate_id').populate({
        path: 'tests',
        populate: { path: 'questions' }
    }).exec();
    return {
        data: lesson,
        message: "Get Lesson successfully",
        errCode: 0,
    };
}

const addTest = async (id, data) => {
    const test_id = data?.test;
    const test = await testModel?.findById(test_id)?.populate('questions').exec();

    const testObject = test?.toObject();


    const count_question = testObject?.questions[0]?.total_question || 0;

    const result = await lessonModel.findOneAndUpdate({ _id: id }, { $push: { tests: test_id }, $inc: { total_question: count_question } }, { new: true });
    return {
        data: result,
        message: "question created successfully",
        errCode: 0,
    };


}


const deleteLesson = async (id) => {
    const result = await lessonModel.findByIdAndDelete(id);
    return {
        data: result,
        message: "Lesson deleted successfully",
        errCode: 0,
    };
};


const updateLesson = async (id, data) => {
    const result = await lessonModel.findByIdAndUpdate(id, data,
        {
            new: true
        });
    return {
        data: result,
        message: "Lesson updated successfully",
        errCode: 0,
    };
}


module.exports = {
    addlesson, getLessonsByCateId, addTest, deleteLesson, updateLesson, getLessonById
}