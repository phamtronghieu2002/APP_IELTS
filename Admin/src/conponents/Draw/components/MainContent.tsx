import { FC, useContext } from "react"
import { context } from "../provider/DrawProvider"

interface MainContentProps {
  title?: string
}

const MainContent: FC<MainContentProps> = ({ title = "Thêm câu hỏi mới" }) => {
  const { drawStore, dispath } = useContext<any>(context)

  return (
    <div className="w-[68%] border-solid border p-5 bg-slate-50 shadow-md">
      <h3 className="font-bold">{title}</h3>
    </div>
  )
}

export default MainContent
