import { FC } from "react"
import TabWrapper from "../../../../conponents/Tab/TabWrapper"
import { items } from "../item"
import { useAppSelector, useAppDispatch } from "../../../../app/hooks"
interface ListeningProps {}

const Listening: FC<ListeningProps> = () => {
  
  const categories = useAppSelector((state) => state.app.categories)

  const id_category_listening = categories.find(
    (category: any) => category.type === "Listening",
  )?._id

  return <TabWrapper items={items(id_category_listening)} />
}

export default Listening
