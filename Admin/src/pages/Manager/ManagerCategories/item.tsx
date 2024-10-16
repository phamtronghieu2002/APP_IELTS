import type { TabsProps } from "antd"
import { FC } from "react"
import Lesson from "./components/Lesson"
import Tips from "./components/Tips"

interface TestProps {}

export const items: (category_id: string,type_category:string) => TabsProps["items"] = (category_id: string,type_category:string) => [
  {
    key: "1",
    label: "Bài học",
    children: <Lesson category_id={category_id} type_category={type_category} />,
  }, 
  {
    key: "2",
    label: "Từ vựng",
    children: "Content of Tab Pane 2",
  },
  {
    key: "3",
    label: "Mẹo",
    children: <Tips category_id={category_id} />,
  },
  {
    key: "4",
    label: "Hướng dẫn",
    children: "Content of Tab Pane 3",
  },
]
