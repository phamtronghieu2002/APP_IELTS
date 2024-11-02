import React from 'react';
import { RadarChart } from 'react-native-charts-wrapper';
import { View, StyleSheet, Text } from 'react-native';

const IeltsRadarChart = () => {
    const data = {
        dataSets: [
            {
                label: "IELTS Skills",
                values: [
                    { value: 70 }, // Nghe 70%
                    { value: 60 }, // Nói 60%
                    { value: 80 }, // Đọc 80%
                    { value: 50 }, // Viết 50%
                    { value: 65 }, // Overall 65%
                    { value: 70 }, // Ngữ pháp 70%
                    { value: 60 }, // Từ vựng 60%
                ],
                config: {
                    color: "rgba(255, 215, 0, 1)",
                    drawFilled: true,
                    circleColor: 'red',
                    drawValues: false,
                    drawLabels: true, // Hiện thị label
                    valueTextSize: 12, // Kích thước chữ giá trị
                    fillColor: "rgba(255,255,51,1)"
                    // hiện thị giá trị sát với  valueFormatter


                },
            }
        ]
    };

    const chartDescription = {
        text: "IELTS Skill Overview",
        textSize: 20,
        textColor: "white"
    };

    const xAxis = {
        valueFormatter: ["Nghe-10%", "Nói-10%", "Đọc", "Viết", "Overall", "Ngữ pháp", "Từ vựng"],
        textSize: 10,
        position: "TOP",
        textColor: "red",
        gridColor: "rgba(255, 255, 255, 0.3)"
    };


    const yAxis = {
        enabled: true, // Bật yAxis lên để kiểm soát tốt hơn
        axisMinimum: 0,
        axisMaximum: 100,
        drawLabels: false, // Ẩn label số của yAxis
        drawGridLines: true,
        gridColor: "rgba(255,255,255,0.2)"
    };

    const legend = {
        enabled: false
    }
    return (
        <View style={styles.container}>
            <RadarChart

                style={styles.chart}
                data={data}
                legend={legend}

                xAxis={xAxis}
                yAxis={yAxis}
            />


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chart: {
        padding: 10,
        width: 350,
        height: 350,
        color: "white",
        backgroundColor: "white" // Màu nền cho biểu đồ
    },
});

export default IeltsRadarChart;
