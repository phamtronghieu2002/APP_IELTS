import React, { FC, useContext, useEffect, useRef } from "react"
import { ModalCView } from "../ModalC/ModalC"
import { FormC } from "../FormC"
import { Button } from "antd"
import { CloseOutlined } from "@ant-design/icons"
import { _log } from "../../utils/_log"
import { MaskLoader } from "../Loader"
import { FormInstance } from "antd/lib"
import { api } from "../../_helper"
import { context } from "../Draw/provider/DrawProvider"
import { _questionType } from "../../utils/_constant"
import { IconC } from "../IconC"

interface ModalquestionProps {
  button: React.ReactNode
  title: string
  type: "add" | "update" | "delete"
  data?: any
  modalProps?: any
  category_id?: string
}

const ModalForm: FC<{
  action: any
  type: "add" | "update" | "delete"
  data?: any
  category_id?: string
}> = ({ action, type, data, category_id }) => {
  const { drawStore, dispath } = useContext<any>(context)
  const [typeQuestion, setTypeQuestion] = React.useState<any>(null)

  const handleSelectTypeQuestion = (data: any) => {
    setTypeQuestion(data)
  }
  const question_type_models = [
    {
      title: "Trắc nghiệm",
      desc: "Cho phép tạo câu hỏi trắc nghiệm có nhiều câu trả lời và chỉ được chọn 1 đáp án đúng",
      id: _questionType?.choice,
      icon: "FaListCheck",
      template:
        "https://res.cloudinary.com/dzpj1y0ww/image/upload/v1728720056/ielts/4a374bae-fbbd-4389-a29f-f01c77d47189.png",
    },
    {
      title: "Tự luận",
      desc: "Cho phép tạo câu hỏi yêu cầu trả lời chi tiết bằng văn bản",
      id: _questionType?.fill_in_blanks,
      icon: "MdOutlineTextRotationNone",
      template:
        "https://res.cloudinary.com/dzpj1y0ww/image/upload/v1728720120/ielts/a3534689-7bc0-4292-8462-ae05ec8ff55f.png",
    },
  ]

  useEffect(() => {
    setTypeQuestion(question_type_models[0])
  }, [])
  return (
    <div className="wrapper flex min-h-[300px]">
      <div className="wp_questionType w-[50%] pr-3">
        {question_type_models.map((item, index) => {
          const active = typeQuestion?.id === item.id ? "bg-green-100" : ""
          return (
            <div
              key={index}
              className={`font-medium text-[16px] flex items-center justify-start p-3 gap-3 hover:bg-gray-100 cursor-pointer ${active}`}
              onClick={() => {
                handleSelectTypeQuestion(item)
                dispath({
                  type: "SET_QUESTION_TYPE",
                  payload: item,
                })
              }}
            >
              <IconC name={item.icon} size={20} />
              <div className="title">{item.title}</div>
            </div>
          )
        })}
        <Button type="primary" className="w-full p-5 mt-5">
          Xác nhận
        </Button>
      </div>
      <div className="wp_content flex-1 flex flex-col gap-3">
        <h3 className="font-bold text-base"> {typeQuestion?.title}</h3>
        <p>{typeQuestion?.desc}</p>
        <h3 className="font-bold text-base">Câu hỏi mẫu</h3>
        <div className="border p-3 min-h-[80px] flex items-center justify-center">
          <img width={300} height={300} src={typeQuestion?.template} />
        </div>
      </div>
    </div>
  )
}

const ModalQuestion: FC<ModalquestionProps> = ({
  button,
  title,
  type,
  data,
  modalProps,
  category_id,
}) => {
  return (
    <ModalCView
      modalProps={{
        width: 800,
        height: 600,
        ...modalProps,
      }}
      button={button}
      title={title}
      children={(action) => (
        <ModalForm
          data={data}
          action={action}
          type={type}
          category_id={category_id}
        />
      )}
    />
  )
}

export default ModalQuestion
