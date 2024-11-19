import React, { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import axios from "axios"
import { getStatistic } from "../../../../services/statisticService"

interface UserStats {
  month: string
  userCount: number
}

const ActivedMonthChart: React.FC = () => {
  const [data, setData] = useState<UserStats[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: any = await getStatistic()
        setData(res.usersMonth)
      } catch (error) {
        console.error("Error fetching user stats:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h3>Thống kê số lượng người dùng theo tháng</h3>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="userCount"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ActivedMonthChart
