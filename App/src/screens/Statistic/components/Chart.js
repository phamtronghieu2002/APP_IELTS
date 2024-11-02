import React from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { G, Polygon, Text as SvgText, Circle } from 'react-native-svg';

const RadarChart = () => {
  const data = [
    { skill: 'Nghe', value: 30 },
    { skill: 'Nói', value: 50 },
    { skill: 'Đọc', value: 70 },
    { skill: 'Viết', value: 20 },
    { skill: 'Overall', value: 40 },
    { skill: 'Ngữ pháp', value: 60 },
    { skill: 'Từ vựng', value: 80 },
  ];

  const numberOfSkills = data.length;
  const chartSize = Dimensions.get('window').width * 0.8; // 80% of screen width
  const radius = chartSize / 2;
  const angleStep = (2 * Math.PI) / numberOfSkills;
  const levels = 4; // Number of levels

  const calculatePoint = (value, angle) => {
    const scaledValue = (value / 100) * radius; // Scale value to fit radius based on 100%
    const x = radius + scaledValue * Math.cos(angle);
    const y = radius - scaledValue * Math.sin(angle);
    return { x, y };
  };

  const points = data.map((item, index) => {
    const angle = index * angleStep;
    return calculatePoint(item.value, angle);
  });

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#e86f6f', padding: 20 }}>
      <Svg width={chartSize} height={chartSize}>
        <G x={0} y={0} originX={radius} originY={radius}>
          {/* Grid lines */}
          {[...Array(levels + 1)].map((_, i) => (
            <Polygon
              key={i}
              points={data.map((_, j) => {
                const angle = j * angleStep;
                const scaledValue = (i / levels) * radius;
                const x = radius + scaledValue * Math.cos(angle);
                const y = radius - scaledValue * Math.sin(angle);
                return `${x},${y}`;
              }).join(' ')}
              stroke="#f2f2f2"
              strokeWidth="1"
              fill="none" 
            />
          ))}

          {/* Filled area */}
          <Polygon
            points={points.map(p => `${p.x},${p.y}`).join(' ')}
            fill="rgba(255, 165,0, 0.2)" // Semi-transparent orange
            stroke="orange"
            strokeWidth="2"
          />

          {/* Skill labels */}
          {data.map((item, index) => {
            const angle = index * angleStep;
            const { x, y } = calculatePoint(105, angle); // Position labels slightly outside the chart
            const textAnchor = angle > Math.PI / 2 && angle < (3 * Math.PI) / 2 ? 'end' : 'start';
            const dx = textAnchor === 'end' ? -10 : 10;
            return (
              <SvgText
                key={index}
                x={x}
                y={y}
                fill="orange"
                fontSize="12"
                textAnchor={textAnchor}
                dx={dx}
                dy="5"
              >
                {item.skill} {item.value}%
              </SvgText>
            );
          })}

          {/* Center dot */}
          <Circle
            cx={radius}
            cy={radius}
            r={2}
            fill="orange"
          />
        </G>
      </Svg>
    </View>
  );
};

export default RadarChart;
