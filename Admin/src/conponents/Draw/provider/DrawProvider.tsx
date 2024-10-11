import React from "react"

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
