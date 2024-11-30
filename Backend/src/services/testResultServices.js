
import TestResultModel from '../models/TestResultModel.js';
import TestModel from '../models/TestsModel.js';

export const addTestResult = async (data) => {
    try {

        const testResult = await TestResultModel.findOne({ test_id: data.test_id, user_id: data?.user_id });
        if (testResult) {
            return {
                data: {},
                message: "Test result already exists",
                errCode: 0,
            }
        }
        const newTestResult = new TestResultModel(data);
        return {
            data: await newTestResult.save(),
            message: "Test result created successfully",
            errCode: 0,
        };

    } catch (error) {
        throw new Error(error);
    }
}

export const addQuestion = async (user_id, test_id, type, data) => {
    const { question_id, is_correct } = data;
    let result = {};

    switch (type) {
        case "new":
            // Kiểm tra xem câu trả lời đã tồn tại hay chưa
            result = await TestResultModel.findOneAndUpdate(
                { test_id, user_id, "anwsers.question_id": question_id },
                {
                    // Nếu tồn tại, cập nhật lại trường `is_correct`
                    $set: { "anwsers.$.is_correct": is_correct }
                },
                {
                    new: true,
                }
            );

            // Nếu không tìm thấy câu trả lời với `question_id`, thêm mới câu trả lời vào mảng
            if (!result) {
                result = await TestResultModel.findOneAndUpdate(
                    { test_id, user_id },
                    {
                        $push: { anwsers: data }
                    },
                    {
                        new: true,
                    }
                );
            }
            break;


        case "redo":
            // nếu là redo thì update lại data trong mảng anwsers
            result = await TestResultModel.findOneAndUpdate({ test_id: test_id, "anwsers.question_id": question_id }, {
                $set: {
                    "anwsers.$": data
                }
            },
                {
                    new: true,
                })
            break;
        case "renew":
            //    xóa hết câu hỏi cũ và thêm câu hỏi mới
            result = await TestResultModel.findOneAndUpdate({ test_id, user_id },
                {
                    $set: {
                        anwsers: []
                    }
                },
                {
                    new: true,
                })
            break;
        default:
            break;
    }


    const dataO = result.toObject();

    const total_correct = dataO.anwsers?.some(item => item?.rating) ? 1 : dataO.anwsers.filter(item => item.is_correct === true).length;
    const total_incorrect = dataO.anwsers.filter(item => item.is_correct === false).length;



    const test = await TestModel.findById(test_id)?.populate('questions').exec();
    const total_questions_of_test = test?.toObject().questions?.[0]?.total_question;
    const fb = await TestResultModel.findOneAndUpdate(
        { test_id, user_id },
        {
            $set: {
                total_correct,
                total_incorrect,
                percent_test_correct: (total_correct / total_questions_of_test) * 100

            }
        },
        {
            new: true
        }
    )
    // cập nhật collection test
    // await TestModel.findByIdAndUpdate(test_id, {
    //     $set: {
    //         total_correct,
    //         total_incorrect,
    //         percent_correct: (total_correct / total_questions_of_test) * 100

    //     }
    // }, {
    //     new: true
    // })

    return {
        data: fb,
        message: "question added successfully",
        errCode: 0,
    }

};


export const getTestResult = async (test_id, user_id) => {
    try {
        const testResult = await TestResultModel.findOne({ test_id, user_id });
        if (!testResult) {
            return {
                data: {},
                message: "Test result not found",
                errCode: 0,
            }
        }
        return {
            data: testResult,
            message: "Test result fetched successfully",
            errCode: 0,
        }
    } catch (error) {
        throw new Error(error);
    }
}


export const deleteTestResult = async (test_id, question_id,user_id) => {
    try {
      
        const result = await TestResultModel.findOneAndUpdate(
            { test_id , user_id},
            {
                $pull: { anwsers: { question_id } }
            },
            {
                new: true
            }
        );
        console.log('====================================');
        console.log("result >>>>>>>>", result);
        console.log('====================================');
        return {
            data: result,
            message: "Test result deleted successfully",
            errCode: 0,
        }
    }
    catch (error) {
        throw new Error(error);
    }

}

export const getAllTestResult = async (user_id) => {
    try {
        // populate('test_id') để lấy thông tin của và đổi tên test_id thành test
        const result = await TestResultModel.find({ user_id }).populate('test_id').exec();



        return {
            data: result,
            message: "Test result fetched successfully",
            errCode: 0,
        }
    } catch (error) {
        throw new Error(error);
    }
}


export const bookmarkTestResult = async (user_id, test_id, note_bookmark, status) => {

    try {
        const result = await TestResultModel.findOneAndUpdate(
            { test_id, user_id },
            {
                $set: { bookmark: status, note_bookmark }
            },
            {
                new: true
            }
        );
        return {
            data: result,
            message: "Test result bookmarked successfully",
            errCode: 0,
        }
    }
    catch (error) {
        throw new Error(error);
    }



}
