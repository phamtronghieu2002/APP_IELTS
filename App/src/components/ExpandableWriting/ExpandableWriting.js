import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Button, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import RenderHtml from "react-native-render-html";


const ExpandableWriting = ({ text, initialHeight = 200 }) => {
    const { width } = useWindowDimensions();
    const [expanded, setExpanded] = React.useState(false);
    const [collapsed, setCollapsed] = React.useState(false);
    const [textHeight, setTextHeight] = React.useState(0);
    const animatedHeight = React.useRef(new Animated.Value(initialHeight)).current;

    const toggleExpand = () => {
        if (expanded) {
            Animated.timing(animatedHeight, {
                toValue: initialHeight,
                duration: 300,
                useNativeDriver: false,
            }).start();
        } else {
            Animated.timing(animatedHeight, {
                toValue: textHeight,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
        setExpanded(!expanded);
    };

    return (
        <View>
            <ScrollView>
                <Animated.View style={{ height: collapsed ? 0 : expanded ? null : animatedHeight }}>

                    <View className="mt-3" onLayout={(event) => {
                        const { height } = event.nativeEvent.layout;
                        if (textHeight === 0) {
                            setTextHeight(height);
                        }
                    }}>
                        <RenderHtml
                            contentWidth={width}
                            source={{ html: text }}
                        />
                    </View>

                </Animated.View>
                {!collapsed && (
                    <TouchableOpacity onPress={toggleExpand} className="flex items-center pb-3">
                        <Text style={{ color: 'blue', marginTop: 10, marginBottom: 10 }}>
                            {expanded ? 'Show More' : 'Show Less'}
                        </Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    );
};

export default ExpandableWriting;
