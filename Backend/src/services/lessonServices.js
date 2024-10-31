
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

// const getLessonsByCateId = async (cate_id, keyword) => {
//     // Tạo điều kiện tìm kiếm chung
//     let searchCondition = { cate_id: cate_id };
//     console.log("keyword", keyword);

//     // Nếu có keyword, thêm điều kiện tìm kiếm cho tất cả các field
//     if (keyword) {
//         const keywordRegex = new RegExp(keyword, 'i'); // 'i' để tìm kiếm không phân biệt hoa thường
//         searchCondition = {
//             cate_id: cate_id,
//             $or: [
//                 { name_lesson: keywordRegex },
//             ],
//         };
//     }

//     // Tìm các bài học theo cate_id và keyword nếu có
//     const lessons = await lessonModel.find(searchCondition).populate('cate_id').populate('tests').exec();

//     // Tính toán phần trăm đúng cho mỗi bài học
//     lessons?.forEach(lesson => {
//         let count_total_correct = 0;
//         lesson.tests?.forEach(test => {
//             count_total_correct += test.total_correct;
//         });
//         lesson.percent_correct = (count_total_correct / lesson.total_question) * 100;
//     });

//     return {
//         data: lessons,
//         message: "Get Lessons successfully",
//         errCode: 0,
//     };
// };


const getLessonsByCateId = async (cate_id, keyword, user_id) => {
    let searchCondition = { cate_id };

    if (keyword) {
        const keywordRegex = new RegExp(keyword, 'i');
        searchCondition = {
            cate_id: new mongoose.Types.ObjectId(cate_id),
            $or: [
                { name_lesson: keywordRegex },
            ],
        };
    }

    const lessons = await lessonModel.aggregate([
        { $match: searchCondition },
        // Chuyển đổi các ID trong mảng `tests` thành ObjectId
        {
            $addFields: {
                cate_id: { $toObjectId: "$cate_id" }, // Chuyển cate_id sang ObjectId
                tests: {
                    $map: {
                        input: '$tests',
                        as: 'testId',
                        in: { $convert: { input: '$$testId', to: 'objectId' } }
                    }
                }
            }
        },

        // Lookup từ Lesson sang Test
        {
            $lookup: {
                from: 'tests',
                localField: 'tests',
                foreignField: '_id',
                as: 'tests'
            }
        },

        // Unwind từng test để chuẩn bị lookup từ Test sang TestResult
        { $unwind: { path: '$tests', preserveNullAndEmptyArrays: true } },

        // Lookup từ Test sang TestResult với điều kiện user_id
        {
            $lookup: {
                from: 'testresuts',
                let: { testId: '$tests._id' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ['$test_id', { $toString: '$$testId' }] },
                                    { $eq: ['$user_id', user_id] }
                                ]
                            }
                        }
                    }
                ],
                as: 'tests.testResults'
            },


        },
        {
            $lookup: {
                from: 'categories', // Tên collection chứa thông tin `cate_id`
                localField: 'cate_id',
                foreignField: '_id',
                as: 'cate_id'
            }
        },
        {
            $unwind: {
                path: '$cate_id',
                preserveNullAndEmptyArrays: true
            }
        },

        // Group lại các tests sau khi lookup
        {
            $group: {
                _id: '$_id',
                name_lesson: { $first: '$name_lesson' },
                total_question: { $first: '$total_question' },
                cate_id: { $first: '$cate_id' },
                tests: { $push: '$tests' },
                createdAt: { $first: '$createdAt' },
                updatedAt: { $first: '$updatedAt' },
                percent_correct: { $first: '$percent_correct' },
            }
        }
    ]);


    const handleDataResult = () => {

        lessons.forEach(lesson => {
            let total_correct_question_test = 0;
            const total_question_lesson = lesson.total_question;
            const tests = lesson.tests;
            tests.forEach(test => {
                const total_corect = test.testResults?.[0]?._id ? test.testResults?.[0]?.total_correct : 0;
                console.log('====================================');
                console.log('total_corect',total_corect);
                console.log('====================================');
                total_correct_question_test += total_corect;
            });
            console.log('====================================');
            console.log("total_correct_question_test >>>>>>>>>>>",total_correct_question_test);
            console.log('====================================');
            lesson.percent_correct = (total_correct_question_test / total_question_lesson) * 100;
            lesson.total_correct = total_correct_question_test;
      
                
        }
        );

    }
    handleDataResult();

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