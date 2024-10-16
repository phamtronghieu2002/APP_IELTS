import React, { FC, useContext, useRef, useState } from "react"
import { ModalCView } from "../ModalC/ModalC"
import { FormC } from "../FormC"

import { Button } from "antd"
import { CloseOutlined } from "@ant-design/icons"

import { _log } from "../../utils/_log"
import { MaskLoader } from "../Loader"
import { FormInstance } from "antd/lib"
import { api } from "../../_helper"
// import {
//   addQuestionToTips,
//   addTipsToLesson,
//   createTips,
//   deleteTips,
//   updateTips,
// } from "../../services/TipsService"
import TinyMCEEditor from "../Markdown/Markdown"
import UploadAudio from "./components/UploadAudio"
import { Input } from "antd"
import {
  createQuestion,
  updateQuestionById,
} from "../../services/questionServices"
import { context } from "../Draw/provider/DrawProvider"

const { TextArea } = Input
interface ModalTipsProps {
  button: React.ReactNode
  title: string
  type: "add" | "update" | "delete"
  data?: any
  modalProps?: any
  lesson_id?: string
  type_category: string
  refresh?: any
}

const ModalForm: FC<{
  action: any
  type: "add" | "update" | "delete"
  data?: any
  lesson_id?: string
  type_category: string
  refresh?: any
}> = ({ action, type, data, lesson_id, refresh, type_category }) => {
  const formRef = useRef<FormInstance<any>>(null)

  const handleAdd = async (fb: any) => {
    try {
      //   const { name_Tips } = formData
      // // //   const res = await createTips({
      // // //     name_Tips,
      // // //   })
      // //   const Tips = res.data
      // //   const Tips_id = Tips?._id
      // //   await addTipsToLesson(lesson_id ?? "", Tips_id)
      //   const q = await createQuestion(formData)
      //   dispath({
      //     type: "SET_QUESTION",
      //     payload: q?.data,
      //   })
      // //   await addQuestionToTips(Tips_id, q?.data?._id)
      //   refresh?.({
      //     ...Tips,
      //     value: Tips?._id,
      //     label: Tips?.name_Tips,
      //   })
      //   api?.message?.success("Thêm Tips thành công")
      //   action?.closeModal()
    } catch (error) {
      _log("erro")
    }
  }
  const handleUpdate = async (fb: any) => {
    try {
      //   const name_Tips = fb?.name_Tips
      //   await updateTips({
      //     name_Tips,
      //     id: data?._id,
      //   })
      //   const res = await updateQuestionById(question?._id, {
      //     question_text: formData?.question_text,
      //     description: formData?.description,
      //     audio_url: formData?.audio_url,
      //   })
      //   const question_fb = res?.data
      //   dispath({
      //     type: "SET_QUESTION",
      //     payload: question_fb,
      //   })
      //   refresh?.()
      //   api?.message?.success("Sửa bài học thành công")
      //   action?.closeModal()
    } catch (error) {
      _log("erro")
    }
  }
  const handleDelete = async (fb: any) => {
    try {
      //   await deleteTips(data?._id)
      //   refresh?.()
      //   api?.message?.success("xóa  bài Tips  thành công !!")
      //   action?.closeModal()
    } catch (error) {
      _log("erro")
    }
  }

  const getActions = (type: string, data: any) => {
    switch (type) {
      case "add":
        return {
          title: "thêm",
          onOK: () => {
            handleAdd(data)
          },
        }
      case "update":
        return {
          title: "sửa",
          onOK: () => {
            handleUpdate(data)
          },
        }

      case "delete":
        return {
          title: "xóa",
          onOK: () => {
            handleDelete(data)
          },
        }

      default:
        break
    }
  }

  const fields = [
    {
      name: "name_tips",
      type: "input",
      label: "Tên tips",
      placeholder: "Nhập tên  Tips",
      rules: [
        {
          required: true,
          message: "Không được để trống",
        },
      ],
    },
  ]
  const onFinish = (values: any) => {
    getActions(type, values)?.onOK()
  }

  return (
    <div>
      {type === "delete" ? (
        <div className="flex items-center gap-7">
          <p>Bạn có chắc chắn muốn xóa bài Tips này không?</p>

          <div className="flex gap-2">
            <Button
              variant="solid"
              color="danger"
              icon={<CloseOutlined />}
              onClick={action?.onCancel}
            >
              Hủy
            </Button>
            <Button onClick={onFinish}>Xác nhận</Button>
          </div>
        </div>
      ) : (
        <>
          <FormC
            ref={formRef}
            initialValues={data}
            chunk={1}
            chunkWidth={1}
            fields={fields}
            onFinish={onFinish}
          />

          <div className="flex items-end justify-end">
            <Button
              onClick={() => {
                formRef?.current?.submit()
              }}
              type="primary"
            >
              {getActions(type, action)?.title}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

const ModalTips: FC<ModalTipsProps> = ({
  button,
  title,
  type,
  data,
  modalProps,
  lesson_id,
  type_category,
  refresh,
}) => {
  return (
    <ModalCView
      modalProps={{
        width: 600,
        ...modalProps,
      }}
      button={button}
      title={title}
      children={(action) => (
        <ModalForm
          refresh={refresh}
          data={data}
          action={action}
          type={type}
          lesson_id={lesson_id}
          type_category={type_category}
        />
      )}
    />
  )
}

export default ModalTips
