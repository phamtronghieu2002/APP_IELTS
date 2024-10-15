import { FC, useContext, useEffect, useState } from "react"
import { context } from "../provider/DrawProvider"
import { question_type_models } from "../../Modal/ModalQuestion"
import { IconC } from "../../IconC"
import TinyMCEEditor from "../../Markdown/Markdown"
import TextArea from "antd/es/input/TextArea"
import ChoiceQuestion, { optionProps } from "./ChoiceQuestion"
import { Button } from "antd"
import { _app } from "../../../utils/_app"
import { MaskLoader } from "../../Loader"
import { api } from "../../../_helper"
import { createQuestion } from "../../../services/questionServices"
interface MainContentProps {
  lesson_id?: string
}

const MainContent: FC<MainContentProps> = ({ lesson_id }) => {
  const { drawStore, dispath } = useContext<any>(context)
  const [loading, setLoading] = useState<boolean>(true)
  const question_select = drawStore?.sub_question_select
  const question = drawStore?.question

  // console.log("====================================")
  // console.log("drawStore", drawStore)
  // console.log("====================================")

  // console.log("====================================")
  // console.log("question_select?.question_text", question_select?.question_text)
  // console.log("====================================")
  const [question_text, setQuestionText] = useState<string>("")
  const [explain, setExplain] = useState<string>("")

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  const question_type_item = question_type_models.find(
    (item) =>
      item.type ===
      (question_select?.question_type || drawStore?.question_type),
  )
  const getTitle = () => {
    if (drawStore?.type_action === "add") {
      return "Thêm câu hỏi mới"
    }
    return "Chỉnh sửa câu hỏi"
  }

  const handleSaveQuestion = async (
    data: optionProps,
    is_save_new: boolean = false,
  ) => {
    try {
      const question_id = question?._id
      const question_type = drawStore?.question_type
      const sub_question_id = question_select
        ? question_select?.question_id
        : _app?.randomId()

      const result = {
        question_id,
        lesson_id,
        questions: {
          question_type,
          description: "",
          question_id: sub_question_id,
          question_text,
          options: data,
          explain,
        },
      }
      await createQuestion(result)
      api?.message?.success("Lưu câu hỏi thành công !!!")
      dispath?.({
        type: "REFRESH",
      })
      dispath?.({
        type: "SET_QUESTION_SELECT",
        payload: result?.questions,
      })
      if (is_save_new) {
        dispath?.({
          type: "SET_QUESTION_SELECT",
          payload: null,
        })
      }
    } catch (error) {
      console.log("====================================")
      console.log("lỗi")
      console.log("====================================")
    }
  }

  return (
    <div className="w-[68%] border-solid border p-5 bg-slate-50 shadow-md relative">
      {loading ? (
        <MaskLoader />
      ) : (
        <>
          <h3 className="font-bold text-lg">{getTitle()}</h3>
          <div className="mt-3">
            <p className="font-medium">Loại câu hỏi</p>
            <div className="flex gap-3 items-center mt-3 mb-3">
              <IconC name={question_type_item?.icon || ""} size={20} />
              <span>{question_type_item?.title}</span>
            </div>
            <label htmlFor="">Đề bài</label>
            <TextArea disabled value={question?.question_text} />
          </div>
          <div className="mt-3">
            <p className="font-medium">Soạn câu hỏi</p>
            <label htmlFor="" className="mb-2 inline-block">
              Nội dung câu hỏi
            </label>
            <TinyMCEEditor
              initialValue={question_select?.question_text}
              onChange={setQuestionText}
              height={200}
              placeholder="Nhập nội dung câu hỏi"
            />
          </div>
          <div className="mt-3">
            <p className="font-medium mb-3">Câu trả lời</p>
            <ChoiceQuestion
              data={question_select?.options}
              onSubmit={handleSaveQuestion}
            />
          </div>
          <div className="explain">
            <label htmlFor="" className="font-bol block mb-3">
              Giải thích đáp án đúng
            </label>
            <TinyMCEEditor
              initialValue={question_select?.explain}
              onChange={setExplain}
              height={200}
              placeholder="Nhập nội dung giải thích"
            />
          </div>
        </>
      )}
    </div>
  )
}

export default MainContent
