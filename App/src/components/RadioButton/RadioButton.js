import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Bạn có thể chọn FontAwesome, MaterialIcons...

const RadioButton = ({ selected, onPress, label, isShowAnswer,
    incorrectAnswerId,
    optionId,
    is_correct }) => {


  

    return (
        <Pressable onPress={onPress} style={styles.container}>
            <View className="w-7">
                <Icon
                    name={isShowAnswer ? (is_correct ? 'check-circle' : incorrectAnswerId == optionId ? 'window-close' : 'circle-thin') : 'circle-thin'} // Sử dụng icon tùy ý
                    size={30}
                    color={isShowAnswer ? (is_correct ? 'green' : incorrectAnswerId == optionId ? 'red' : 'gray') : 'gray'}
                />
            </View>
            {label && <Text style={styles.label}>{label}</Text>}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    label: {
        marginLeft: 12,
        fontSize: 16,
        color: '#333',
    },
});

export default RadioButton;
