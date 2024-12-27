import React, { useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Modal, View, Text, ActivityIndicator } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import IonA from 'react-native-vector-icons/FontAwesome';
import Dictionary from '../../screens/Dictionary/Dictionary';

const FloatButton = ({ navigation }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true); // Trạng thái loading WebView
    const translateX = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(0)).current;

    const handleGesture = Animated.event(
        [
            {
                nativeEvent: {
                    translationX: translateX,
                    translationY: translateY,
                },
            },
        ],
        { useNativeDriver: true }
    );

    const handleGestureEnd = (event) => {
        const { translationX, translationY } = event.nativeEvent;
        setPosition((prevPosition) => ({
            x: prevPosition.x + translationX,
            y: prevPosition.y + translationY,
        }));
        translateX.setValue(0);
        translateY.setValue(0);
    };

    const handlePress = () => {
        setModalVisible(true); // Mở Modal khi nhấn nút
    };

    const handleWebViewLoadEnd = () => {
        setLoading(false); // Dừng trạng thái loading khi WebView tải xong
    };

    return (
        <>
            <PanGestureHandler onGestureEvent={handleGesture} onEnded={handleGestureEnd}>
                <Animated.View
                    style={[
                        styles.floatButton,
                        {
                            transform: [
                                { translateX: Animated.add(new Animated.Value(position.x), translateX) },
                                { translateY: Animated.add(new Animated.Value(position.y), translateY) },
                            ],
                        },
                    ]}
                >
                    <Pressable onPress={handlePress} style={styles.button}>
                        <IonA name="language" size={20} color="#fff" />
                    </Pressable>
                </Animated.View>
            </PanGestureHandler>

            {/* Modal để hiển thị WebView */}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {/* Loader khi WebView đang tải */}
                        {loading && (
                            <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
                        )}

                        {/* WebView */}
                       <Dictionary/>
                        <Pressable
                            onPress={() => setModalVisible(false)}
                            style={styles.closeButton}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    floatButton: {
        position: 'absolute',
        bottom: 80,
        right: 20,
        zIndex: 100,
    },
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 50,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: 400,
        height: 500,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    webView: {
        width: '100%',
        height: 300,
    },
    loader: {
        position: 'absolute',
        top: '50%',
        left: '50%',
    },
    closeButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#007AFF',
        borderRadius: 5,
        marginTop: 10,
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default FloatButton;
