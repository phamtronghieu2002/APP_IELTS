import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { getLearningTime } from '../../../services/learningTimeService';

const TimeChart = ({ freshkey }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLearningTime();
  
        const formattedData = response.map((item) => {
          const date = new Date(item.date);
          const month = String(date.getMonth() + 1).padStart(2, '0'); // Thêm '0' nếu là tháng 1 chữ số
          const year = date.getFullYear();
          const day = date.getDate();
          return {
              value: item.minutes,
              label: `${day}/${month}`,
          };
      });

      setChartData(formattedData);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu thống kê:', error);
      }
    };

    fetchData();
  }, [freshkey]);

  return (
    <View style={{ padding: 16, backgroundColor: '#f4f6f9', borderRadius: 12, marginHorizontal: 20, marginTop: 20 }}>
      <View className="p-1">
        <LineChart
          data={chartData}
          width={Dimensions.get('window').width - 40}
          height={250}
          thickness={3}
          color="#4CAF50" // Màu của đường biểu đồ
          startFillColor="#81C784"
          endFillColor="#A5D6A7"
          startOpacity={0.3}
          endOpacity={0.1}
          dataPointsColor="#388E3C"
          dataPointsRadius={4}
          showDataPointTooltip // Hiển thị tooltip cho từng điểm dữ liệu
          tooltipTextStyle={{ color: '#fff', fontSize: 12 }}
          tooltipContainerStyle={{ backgroundColor: '#388E3C', padding: 4, borderRadius: 5 }}
          xAxisColor="#8E8E93"
          yAxisColor="#8E8E93"
          xAxisLabelTextStyle={{ color: '#616161', fontSize: 10 }}
          yAxisLabelTextStyle={{ color: '#616161', fontSize: 10 }}
          yAxisSuffix=" phút"
          noOfSections={5}
          areaChart
   
          animationDuration={500} // Thay đổi độ dài hoạt hình
          curved // Tạo đường cong cho biểu đồ
        />
      </View>
    </View>
  );
};

export default TimeChart;
