import React from 'react';
import { RadarChart } from 'react-native-charts-wrapper';
import { View, StyleSheet, Text } from 'react-native';

const IeltsRadarChart = ({
    dataProps = []
}) => {


    const data = {
        dataSets: [
            {
                label: "IELTS Skills",
                values: dataProps?.map((item) => item.value),
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
        text: "",
        textSize: 12,
        textColor: "white"
    };

    const xAxis = {
        valueFormatter: dataProps?.map((item) => item.label),
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
                chartDescription={chartDescription}
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
        marginTop: 400,
        padding: 10,
        width: 350,
        height: 350,
        color: "white",
        backgroundColor: "white" // Màu nền cho biểu đồ
    },
});

export default IeltsRadarChart;
