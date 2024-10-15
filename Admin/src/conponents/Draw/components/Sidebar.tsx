import { FC, useContext, useEffect, useState } from "react"
import Select from "react-select"
import ModalTest from "../../Modal/ModalTest"
import { Button, Tooltip } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { IconC } from "../../IconC"
import ModalQuestion from "../../Modal/ModalQuestion"
import { getLessonById } from "../../../services/lessonService"
import "./Sidebar.scss"
import { context } from "../provider/DrawProvider"
import { getTestById } from "../../../services/testService"
import { d } from "vitest/dist/types-e3c9754d.js"
import { use } from "i18next"
import { MaskLoader } from "../../Loader"

interface SidebarProps {
  lesson_id: string
  category_id: string
  type_category: string
}

const Sidebar: FC<SidebarProps> = ({
  lesson_id,
  category_id,
  type_category,
}) => {
  const [questions, setQuestions] = useState<any[]>([])
  const [tests, setTests] = useState<any[]>([])
  const [testSelected, setTestSelected] = useState<any>(null)
  const { drawStore, dispath } = useContext<any>(context)
  const [loading, setLoading] = useState<boolean>(false)

    console.log('====================================');
    console.log("testSelected", testSelected);
    console.log('====================================');

  const fetchQuestions = async (test_id: string, isFirst: boolean) => {
    setLoading(true)
    const res = await getTestById(test_id)
    const questions = res.data?.questions?.[0]?.questions || []
    setLoading(false)
    setQuestions(questions)

    if (isFirst) {
      dispath({ type: "SET_QUESTION_SELECT", payload: questions?.[0] })
      dispath({
        type: "SET_QUESTION",
        payload: res.data?.questions?.[0],
      })
    }
  }

  const fetchTest = async () => {
    const res = await getLessonById(lesson_id)
    const tests = res.data?.tests
    setTests(() => {
      return tests?.map((test: any) => ({
        value: test?._id,
        label: test?.name_test,
        ...test,
      }))
    })
  }

  useEffect(() => {
    fetchTest()
  }, [])

  // Cập nhật testSelected khi danh sách tests thay đổi
  useEffect(() => {
    if (tests.length > 0 && !testSelected) {
      const test_id = tests[0]?._id

      dispath({ type: "SET_TEST_ID", payload: test_id })
      setTestSelected(tests[0]) // Chọn test đầu tiên làm mặc định
    }
  }, [tests])

  useEffect(() => {
    if (testSelected) {
      fetchQuestions(testSelected._id, drawStore?.freshKey == 0)
    }
  }, [testSelected, drawStore?.freshKey])

  const onChange = (test: any) => {
    dispath({ type: "SET_TEST_ID", payload: test._id })
    setTestSelected(test)
  }

  return (
    <div className="w-[30%]">
      <div className="bg-slate-50 p-5 border shadow-md sticky top-0">
        <div className="item border-b-2">
          <div className="heading flex justify-between">
            <h3 className="font-bold">Danh sách bài Test</h3>
            <ModalTest
              type_category={type_category}
              refresh={(test: any) => {
                fetchTest()
                setTestSelected(test)
              }}
              lesson_id={lesson_id}
              button={
                <Tooltip title="Thêm bài Test">
                  <Button size="small" className="text-blue font-medium">
                    <PlusOutlined />
                    Thêm
                  </Button>
                </Tooltip>
              }
              title="Thêm bài Test"
              type="add"
            />
          </div>
          <div className="body mt-3">
            <Select
              options={tests}
              value={testSelected} // Sử dụng value thay vì defaultValue
              onChange={onChange}
              className="text-base"
              classNamePrefix="react-select"
              placeholder="Tìm kiếm bài test..."
              isSearchable // Bật tính năng tìm kiếm
            />
            <div className="actions flex gap-1 mt-3">
              <ModalTest
                type_category={type_category}
                refresh={fetchTest}
                lesson_id={lesson_id}
                title={`Sửa bài test`}
                button={
                  <Tooltip title="Sửa bài test">
                    <Button
                      size="large"
                      type="link"
                      className="bg-blue-500 text-white p-2 rounded"
                    >
                      <IconC name={`FaEdit`} size={23} />
                    </Button>
                  </Tooltip>
                }
                type="update"
                data={testSelected}
              />
              <ModalTest
                type_category={type_category}
                refresh={fetchTest}
                lesson_id={lesson_id}
                modalProps={{
                  width: 550,
                }}
                title={`Xóa bài test`}
                button={
                  <Tooltip title="Xóa bài test">
                    <Button
                      size="large"
                      className="border-0 text-white p-2 !text-rose-700"
                    >
                      <IconC name={`LiaTrashAlt`} size={23} />
                    </Button>
                  </Tooltip>
                }
                type="delete"
                data={testSelected}
              />
            </div>
          </div>
        </div>
        <div className="item mt-3">
          <div className="heading flex justify-between">
            <h3 className="font-bold">Danh mục câu hỏi</h3>
          </div>
          <div className="body mt-3">
            <div className="actions flex gap-3 flex-wrap">
              <ModalQuestion
                button={
                  <Tooltip title="Thêm câu hỏi">
                    <Button size="middle" type="primary" className="">
                      <PlusOutlined /> Chọn loại câu hỏi
                    </Button>
                  </Tooltip>
                }
                title="Thêm câu hỏi"
                type="add"
              />
              <ModalQuestion
                button={
                  <Tooltip title="Xóa câu hỏi">
                    <Button
                      size="middle"
                      className="!bg-rose-700 font-medium text-lime-50"
                    >
                      <IconC name={`FaTrash`} size={15} />
                      Xóa câu hỏi
                    </Button>
                  </Tooltip>
                }
                title="Sắp xếp câu hỏi"
                type="delete"
              />
              <ModalQuestion
                button={
                  <Tooltip title="Sắp xếp câu hỏi">
                    <Button type="primary" size="middle">
                      <IconC name={`FaSortAlphaUp`} size={15} />
                      Sắp xếp câu hỏi
                    </Button>
                  </Tooltip>
                }
                title="Sắp xếp câu hỏi"
                type="add"
              />
            </div>
            <div className="questions flex gap-3 flex-wrap mt-10 ">
              {loading ? (
                <MaskLoader />
              ) : (
                questions.map((question, index) => {
                  const active =
                    drawStore?.sub_question_select?.question_id ===
                    question?.question_id
                      ? "active"
                      : ""
                  return (
                    <div
                      onClick={() => {
                        dispath({
                          type: "SET_QUESTION_SELECT",
                          payload: question,
                        })
                        dispath({
                          type: "SET_QUESTION_TYPE",
                          payload: question?.question_type,
                        })
                      }}
                      key={index}
                      className={`question rounded ${active}  flex items-center justify-center w-[35px] h-[35px] border cursor-pointer`}
                    >
                      {index + 1}
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
