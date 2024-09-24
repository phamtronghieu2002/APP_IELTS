import { FC } from "react"
import TabWrapper from "../../../../conponents/Tab/TabWrapper"
import { items } from "./items"
interface ListeningProps {}

const Listening: FC<ListeningProps> = () => {
  return <TabWrapper items={items} />
}

export default Listening
