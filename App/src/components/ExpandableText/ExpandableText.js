import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Button, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import RenderHtml from "react-native-render-html";
import Icon from 'react-native-vector-icons/MaterialIcons';
import AudioPlayerUI from '../AudioPlayer/AudioPlayerUI';


const ExpandableText = ({ text, initialHeight = 200, type, name, classnames, isToggle = true }) => {
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

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
        setExpanded(false);
        Animated.timing(animatedHeight, {
            toValue: collapsed ? initialHeight : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    return (
        <View>
            <View className="flex flex-row items-center justify-between">
                <Text className="font-bold">
                    {name}
                </Text>
                <TouchableOpacity onPress={toggleCollapse} style={{ alignSelf: 'flex-end' }}>
                    <Icon name={collapsed ? 'visibility' : 'visibility-off'} size={24} color="black" />
                </TouchableOpacity>
            </View>

            <ScrollView
                className={`mt-[-25px] ${classnames}`}
            >
                <Animated.View style={{ height: collapsed ? 0 : expanded ? null : animatedHeight }}>
                    {!collapsed && type === "text" && (
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
                    )}
                    {!collapsed && type === "audio" && (
                        <View
                            className="mt-3"
                            onLayout={(event) => {
                                const { height } = event.nativeEvent.layout;
                                if (textHeight === 0) {
                                    setTextHeight(height);
                                }
                            }}
                        >
                                <AudioPlayerUI 
                                audio_url={text}
                                />
                        </View>
                    )}
                </Animated.View>
                {!collapsed && (
                    <TouchableOpacity onPress={toggleExpand} className="flex items-center mt-3">

                        {
                            isToggle && <Text style={{ color: 'blue', marginTop: 10 }}>
                                {!expanded ? 'Show More' : 'Show Less'}
                            </Text>
                        }

                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    );
};

export default ExpandableText;
