import { FC } from "react"
import Modaltest from "../../Modal/ModalTest"
import { Button } from "antd"
import Icon, { PlusOutlined } from "@ant-design/icons"
import { Select } from "antd"
import { IconC } from "../../IconC"
import { Tooltip } from "antd"
interface SidebarProps {}

const Sidebar: FC<SidebarProps> = () => {
  const onChange = (value: string) => {
    console.log(`selected ${value}`)
  }

  const onSearch = (value: string) => {
    console.log("search:", value)
  }

  return (
    <div className="w-[30%]">
      <div className=" bg-slate-50 p-5 border shadow-md">
        <div className="item border-b-2">
          <div className="heading flex justify-between">
            <h3 className="font-bold">Danh sách bài Test</h3>
            <Modaltest
              button={
                <Tooltip title="Thêm bài Test">
                  <Button size="small" className="text-blue font-medium">
                    {/* icon add */}
                    <PlusOutlined />
                    Thêm
                  </Button>
                </Tooltip>
              }
              title="Thêm bài Test"
              type="add"
            />
          </div>
          <div className="body mt-3">
            <Select
              showSearch
              placeholder="Chọn bài Test"
              optionFilterProp="label"
              onChange={onChange}
              onSearch={onSearch}
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
                {
                  value: "tom",
                  label: "Tom",
                },
              ]}
            />

            <div className="actions flex gap-1 mt-3">
              <Modaltest
                title={`Sửa bài test`}
                button={
                  <Tooltip title="Sửa bài test">
                    <Button
                      size="large"
                      type="link"
                      className="bg-blue-500 text-white p-2 rounded"
                    >
                      <IconC name={`FaEdit`} size={23} />
                    </Button>
                  </Tooltip>
                }
                type="update"
                data={{}}
              />
              <Modaltest
                modalProps={{
                  width: 550,
                }}
                title={`Xóa bài test`}
                button={
                  <Tooltip title="Xóa bài test">
                    <Button
                      size="large"
                      className=" border-0 text-white p-2  text-rose-700"
                    >
                      <IconC name={`LiaTrashAlt`} size={23} />
                    </Button>
                  </Tooltip>
                }
                type="delete"
                data={{}}
              />
            </div>
          </div>
        </div>
        <div className="item mt-3">
          <div className="heading flex justify-between">
            <h3 className="font-bold">Danh mục câu hỏi</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
