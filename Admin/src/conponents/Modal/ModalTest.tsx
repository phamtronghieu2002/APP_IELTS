import React, { FC, useContext, useRef } from "react"
import { ModalCView } from "../ModalC/ModalC"
import { FormC } from "../FormC"
import { an } from "vitest/dist/types-e3c9754d.js"
import { Button } from "antd"
import { CloseOutlined } from "@ant-design/icons"

import { _log } from "../../utils/_log"
import { context } from "../../pages/Manager/ManagerCategories/Provider/ManagerCategoryProvider"
import { MaskLoader } from "../Loader"
import { FormInstance } from "antd/lib"
import { api } from "../../_helper"
import {
  addTestToLesson,
  createTest,
  deleteTest,
  updateTest,
} from "../../services/testService"

interface ModaltestProps {
  button: React.ReactNode
  title: string
  type: "add" | "update" | "delete"
  data?: any
  modalProps?: any
  lesson_id: string
  refresh?: () => void
}

const ModalForm: FC<{
  action: any
  type: "add" | "update" | "delete"
  data?: any
  lesson_id: string
  refresh?: () => void
}> = ({ action, type, data, lesson_id, refresh }) => {
  const { storeCategories, dispath } = useContext<any>(context)

  const formRef = useRef<FormInstance<any>>(null)
 
  const handleAdd = async (fb: any) => {
    try {
      const name_test = fb?.name_test
      dispath({ type: "loading", payload: true })
      const res = await createTest({
        name_test,
      })
      const test_id = res.data?._id

      await addTestToLesson(lesson_id ?? "", test_id)
      refresh?.()
      api?.message?.success("Thêm test thành công")
      action?.closeModal()
    } catch (error) {
      _log("erro")
    }
  }
  const handleUpdate = async (fb: any) => {
    try {
      const name_test = fb?.name_test
      dispath({ type: "loading", payload: true })
      await updateTest({
        name_test,
        id: data?._id,
      })

      refresh?.()

      api?.message?.success("Sửa bài học thành công")
      action?.closeModal()
    } catch (error) {
      _log("erro")
    }
  }
  const handleDelete = async (fb: any) => {
    try {
      dispath({ type: "loading", payload: true })
      await deleteTest(data?._id)
      refresh?.()

      api?.message?.success("xóa  bài test  thành công !!")
      action?.closeModal()
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
      name: "name_test",
      type: "input",
      label: "Tên",
      placeholder: "Nhập tên bài test",
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
      {storeCategories?.loading && <MaskLoader />}
      {type === "delete" ? (
        <div className="flex items-center gap-7">
          <p>Bạn có chắc chắn muốn xóa bài test này không?</p>

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

const Modaltest: FC<ModaltestProps> = ({
  button,
  title,
  type,
  data,
  modalProps,
  lesson_id,
  refresh,
}) => {
  return (
    <ModalCView
      modalProps={{
        width: 400,
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
        />
      )}
    />
  )
}

export default Modaltest
