import React from "react"
import { Question } from "../../Question"

interface DrawProviderProps {
  children: React.ReactNode
}
export const context = React.createContext<any>(null)

interface actionType {
  type: string
  payload?: any
}
const initState = {
  test_id: "",
  question: null,
  questionType: "",
}

const DrawProvider: React.FC<DrawProviderProps> = ({ children }) => {
  const [drawStore, setDrawStore] = React.useState<any>(initState)

  const dispath = (action: actionType) => {
    switch (action.type) {
      case "SET_TEST_ID":
        setDrawStore((prev: any) => ({
          ...prev,
          test_id: action?.payload,
        }))
        break
      case "SET_QUESTION_TYPE":
        setDrawStore((prev: any) => ({
          ...prev,
          questionType: action?.payload,
        }))
      case "SET_QUESTION":
        setDrawStore((prev: any) => ({
          ...prev,
          question: action?.payload,
        }))
        break
      default:
        break
    }
  }

  return (
    <context.Provider value={{ drawStore, dispath }}>
      {children}
    </context.Provider>
  )
}

export default DrawProvider
