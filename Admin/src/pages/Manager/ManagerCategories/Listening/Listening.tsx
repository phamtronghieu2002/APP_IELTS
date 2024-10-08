import { FC } from "react"
import TabWrapper from "../../../../conponents/Tab/TabWrapper"
import { items } from "../item"
interface ListeningProps {}

const Listening: FC<ListeningProps> = () => {
  return <TabWrapper items={items()} />
}

export default Listening
