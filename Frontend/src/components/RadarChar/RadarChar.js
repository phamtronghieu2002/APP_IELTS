import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Polygon, Circle } from 'react-native-svg';

const RadarChart = ({ data, captions, size }) => {
  const numberOfAxes = Object.keys(captions).length;
  const radius = size / 2;
  const angle = (2 * Math.PI) / numberOfAxes;

  const points = data[0].data; // Dữ liệu cho biểu đồ đầu tiên
  const polygonPoints = Object.keys(points)
    .map((key, index) => {
      const value = points[key] * radius;
      const x = radius + value * Math.cos(angle * index - Math.PI / 2);
      const y = radius + value * Math.sin(angle * index - Math.PI / 2);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <View>
      <Svg height={size} width={size}>
        <Polygon points={polygonPoints} fill="blue" stroke="blue" strokeWidth="2" />
        {/* Vẽ các trục */}
        {Object.keys(captions).map((key, index) => (
          <Circle key={index} cx={radius} cy={radius} r={radius * 0.01} fill="black" />
        ))}
      </Svg>
      {Object.keys(captions).map((key, index) => (
        <Text key={index} style={{ position: 'absolute', top: 0, left: radius, transform: [{ translateY: -10 }] }}>
          {captions[key]}
        </Text>
      ))}
    </View>
  );
};

export default RadarChart;
