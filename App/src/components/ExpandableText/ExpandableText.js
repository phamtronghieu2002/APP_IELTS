import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Button, useWindowDimensions} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import RenderHtml from "react-native-render-html";
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import icon
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';

const ExpandableText = ({ text, initialHeight = 200 , type}) => {
    const [expanded, setExpanded] = React.useState(false); // State cho show more/less
    const [collapsed, setCollapsed] = React.useState(false); // State cho việc ẩn toàn bộ nội dung
    const [textHeight, setTextHeight] = React.useState(0); // Chiều cao thật của văn bản
    const animatedHeight = React.useRef(new Animated.Value(initialHeight)).current;
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [position, setPosition] = useState(0);
    const intervalRef = useRef(null);
    const { width } = useWindowDimensions();

    async function loadSound() {
        const { sound } = await Audio.Sound.createAsync(
            { uri: 'https://webaudioapi.com/samples/audio-tag/chrono.mp3' }, // Replace with your audio URL
            { shouldPlay: false }
        );
        sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        setSound(sound);
    }

    const onPlaybackStatusUpdate = (status) => {
        if (status.isLoaded) {
            setDuration(status.durationMillis || 0);
            setPosition(status.positionMillis || 0);
            setIsPlaying(status.isPlaying);
        }
    };

    const playSound = async () => {
        if (sound) {
            await sound.playAsync();
            startPositionLogger();
        }
    };

    const pauseSound = async () => {
        if (sound) {
            await sound.pauseAsync();
            stopPositionLogger();
        }
    };

    const stopSound = async () => {
        if (sound) {
            await sound.stopAsync();
            stopPositionLogger();
            setPosition(0); // Reset position to start
        }
    };

    const startPositionLogger = () => {
        stopPositionLogger(); // Clear any existing interval
        intervalRef.current = setInterval(async () => {
            const status = await sound.getStatusAsync();
            if (status.isLoaded) {
                setPosition(status.positionMillis);
                console.log('Current Position:', status.positionMillis);
            }
        }, 1000); // Update every second
    };

    const stopPositionLogger = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const handleSliderChange = async (value) => {
        if (sound) {
            await sound.setPositionAsync(value);
            setPosition(value);
        }
    };

    useEffect(() => {
        loadSound();
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
            stopPositionLogger();
        };
    }, []);

    const formatTime = (millis) => {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

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


                    {!collapsed && type == "text" && (
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
                    {!collapsed && type == "audio" && (
                        <View
                        className="mt-3"
                          onLayout={(event) => {
                              const { height } = event.nativeEvent.layout;
                              if (textHeight === 0) {
                                  setTextHeight(height); // Lưu chiều cao thật của văn bản
                              }
                          }}
                      >
                            <View style={{ padding: 20 }}>
            <Text>Audio Player</Text>
            <Slider
                style={{ width: '100%', height: 40 }}
                minimumValue={0}
                maximumValue={duration}
                value={position}
                onValueChange={handleSliderChange}
                minimumTrackTintColor="#1EB1FC"
                maximumTrackTintColor="#8B8B8B"
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                <Button title="Play" onPress={playSound} disabled={isPlaying} />
                <Button title="Pause" onPress={pauseSound} disabled={!isPlaying} />
                <Button title="Stop" onPress={stopSound} />
            </View>
            <Text>
                {formatTime(position)} / {formatTime(duration)}
            </Text>
        </View>
                      </View>
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
