import React, { useEffect, useState } from 'react';
import { AppState } from 'react-native';
import axios from 'axios';
import { getData, storeData } from '../utils/asyncStore';
import { createLearningTime } from '../services/learningTimeService';

const LearningTimeProvider = ({ children, userId }) => {
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        const handleAppStateChange = (nextAppState) => {
            console.log('AppState changed:', nextAppState); // Debug log
            if (nextAppState === 'active') {
                console.log('App became active');
                setStartTime(Date.now()); // Bắt đầu đếm thời gian khi vào app
            } else if (nextAppState === 'background' || nextAppState === 'inactive') {
                console.log('App went to background');
                if (startTime) {
                    const sessionTime = Math.floor((Date.now() - startTime) / 60000); // Tính phút
                    handleSaveTime(sessionTime);
                }
            }
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            subscription.remove();
        };
    }, [startTime]);

    const handleSaveTime = async (sessionTime) => {
        try {
            const existingTime = await getData('timeLearing');
            const totalTime = existingTime ? existingTime + sessionTime : sessionTime; 
            await storeData('timeLearing', totalTime);
            setElapsedTime((prev) => prev + sessionTime);
            await sendLearningTime(sessionTime);
            console.log(`Session time of ${sessionTime} minutes saved.`);
        } catch (error) {
            console.error('Lỗi khi lưu thời gian học:', error);
        }
    };

    const sendLearningTime = async (sessionTime) => {
        try {
            await createLearningTime(
                sessionTime
            )
            console.log('Time sent to server');
        } catch (error) {
            console.error('Lỗi khi gửi thời gian học lên server:', error);
        }
    };

    return children;
};

export default LearningTimeProvider;
