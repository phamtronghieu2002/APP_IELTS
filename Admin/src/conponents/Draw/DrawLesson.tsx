import { FC, memo, useContext, useEffect, useState } from "react"
import React from "react"
import {
  Button,
  Form,
  Switch,
  Select,
  Checkbox,
  Popconfirm,
  message,
} from "antd"
import DrawC from "../DrawC/DrawC"
import DrawProvider from "./provider/DrawProvider"
import MainContent from "./components/MainContent"
import Sidebar from "./components/Sidebar"

interface DrawLessonProps {
  button: React.ReactNode
  title: string
  data: any
}

interface ContentDrawProps {
  data?: any
}

const ContentDraw: FC<ContentDrawProps> = ({ data }) => {
  const lesson_id = data?._id
  const category_id = data?.category_id


  return (
    <div className="wrapper flex justify-between bg-slate-100 h-full">
      <Sidebar lesson_id={lesson_id} category_id={category_id} />
      <MainContent />
    </div>
  )
}

const DrawLesson: FC<DrawLessonProps> = ({ button, title, data }) => {
  return (
    <DrawProvider>
      <DrawC
        title={
          <p>
            Quản lí bài kiểm tra: <b>{data?.name_lesson}</b>
          </p>
        }
        button={button}
        data={data}
        children={(action) => <ContentDraw {...action} data={data} />}
      />
    </DrawProvider>
  )
}

export default DrawLesson
