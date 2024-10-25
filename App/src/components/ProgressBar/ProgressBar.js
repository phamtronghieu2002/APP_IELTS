import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import {ProgressBar} from 'react-native-splited-progress-bar';

const ProgressBarCount = ({percentage, size, compeletedColor}) => {
    
    return (
          <ProgressBar
    percentage={percentage}
    size={size}
    completedColor={compeletedColor}
/>
    );
};

const styles = StyleSheet.create({
    
});

export default ProgressBarCount;
