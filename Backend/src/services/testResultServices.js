
import TestResultModel from '../models/TestResultModel.js';
import TestModel from '../models/TestsModel.js';

export const addTestResult = async (data) => {
    try {

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

export const addQuestion = async (test_id, type, data) => {
    const { question_id } = data;
    let result = {}
    switch (type) {
        case "new":
            // nếu là new thì push data vào mảng anwsers
            result = await TestResultModel.findOneAndUpdate({ test_id },
                {
                    $push: {
                        anwsers: data
                    }
                },
                {
                    new: true,
                })
            break
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
            result= await TestResultModel.findOneAndUpdate({ test_id },
                {
                    $set: {
                        anwsers: data
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

    const total_correct = dataO.anwsers.filter(item => item.is_correct === true).length;
    const total_incorrect = dataO.anwsers.filter(item => item.is_correct === false).length;
    // cập nhật collection test
    await TestModel.findByIdAndUpdate(test_id, {
        $set: {
            total_correct,
            total_incorrect
        }
    }, {
        new: true
    })

    return {
        data: result,
        message: "question added successfully",
        errCode: 0,
    }

};
