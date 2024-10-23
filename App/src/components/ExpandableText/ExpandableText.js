import React from 'react';
import { View, Text, TouchableOpacity, Animated, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import RenderHtml from "react-native-render-html";
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import icon

const ExpandableText = ({ text, initialHeight = 200 }) => {
    const [expanded, setExpanded] = React.useState(true); // State cho show more/less
    const [collapsed, setCollapsed] = React.useState(false); // State cho việc ẩn toàn bộ nội dung
    const [textHeight, setTextHeight] = React.useState(0); // Chiều cao thật của văn bản
    const animatedHeight = React.useRef(new Animated.Value(initialHeight)).current;
    const { width } = useWindowDimensions();

    const toggleExpand = () => {
        if (expanded) {
            // Thu gọn văn bản
            Animated.timing(animatedHeight, {
                toValue: initialHeight, // Chiều cao ban đầu khi thu gọn
                duration: 300,
                useNativeDriver: false,
            }).start();
        } else {
            // Mở rộng văn bản
            Animated.timing(animatedHeight, {
                toValue: textHeight, // Chiều cao thật của văn bản
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
        setExpanded(!expanded);
    };

    // Logic để thu gọn toàn bộ văn bản khi nhấn vào biểu tượng con mắt
    const toggleCollapse = () => {
        setCollapsed(!collapsed);
        setExpanded(false); // Thu gọn văn bản nếu đang mở rộng
        Animated.timing(animatedHeight, {
            toValue: collapsed ? initialHeight : 0, // Nếu nhấn vào con mắt thì chiều cao thành 0
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    return (
        <View>
            <View className="flex flex-row items-center justify-between">
                <Text className="font-bold">
                    Reading passage
                </Text>
                {/* Biểu tượng con mắt để ẩn/hiện toàn bộ nội dung */}
                <TouchableOpacity onPress={toggleCollapse} style={{ alignSelf: 'flex-end' }}>
                    <Icon name={collapsed ? 'visibility' : 'visibility-off'} size={24} color="black" />
                </TouchableOpacity>
            </View>

            <ScrollView>

                <Animated.View style={{ height: collapsed ? 0 : expanded ? null : animatedHeight }}>


                    {!collapsed && (


                        <Text
                            className="mt-3"
                            onLayout={(event) => {
                                const { height } = event.nativeEvent.layout;
                                if (textHeight === 0) {
                                    setTextHeight(height); // Lưu chiều cao thật của văn bản
                                }
                            }}
                        >
                            <RenderHtml
                                contentWidth={width}
                                source={{
                                    html:text
                                      
                                }}
                            />
                        </Text>
                    )}
                </Animated.View>

                {/* Nút Show More/Less */}
                {!collapsed && (
                    <TouchableOpacity onPress={toggleExpand} className="flex items-center">
                        <Text style={{ color: 'blue', marginTop: 10 }}>
                            {expanded ? 'Show More' : 'Show Less'}
                        </Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    );
};

export default ExpandableText;
