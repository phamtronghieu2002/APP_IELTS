import React from 'react';
import PropTypes from 'prop-types'
import {
    View,
    Text,
    Image,
    ScrollView,
    SafeAreaView,
    FlatList,
    SectionList,
    TextInput,
    TouchableOpacity,
    Pressable,
} from 'react-native';
import { useState } from 'react';
import { Switch } from 'react-native-switch';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const convertTimeToHHMM = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};

const Notify = ({ Icon, rounded, border = 'border', title = 'Notifycation', onHandle }) => {
    const [time, setTime] = useState(new Date());
    const [show, setShow] = useState(false);
    const [switchValue, setSwitchValue] = useState(false);
    const onChange = (event, selectedTime) => {
        const currentTime = selectedTime || time;
        setShow(Platform.OS === 'ios');
        setTime(currentTime);
    };

    const showTimepicker = () => {
        setShow(true);
    };

    return (

        <View className={`${rounded} ${border}   border-gray-300 w-[100%] h-[67px] flex flex-row items-center justify-between pl-4 pr-4`}>
            {Icon}
            <Text className="text-lg">{title}</Text>

            <View
                onPress={showTimepicker}

                className="shadow-md rounded-lg  w-[90px] h-[34px] border border-gray-400 flex flex-row items-center justify-center">
                <TouchableOpacity onPress={showTimepicker} className="mr-3">
                    <Text className="text-lg">{convertTimeToHHMM(time)}</Text>
                </TouchableOpacity>

                {<FontAwesome name="caret-down" size={20} color="#000" />}
            </View>
            {/* switch button here */}
            <Switch
                backgroundActive={'#4CAF50'}
                activeText={''}
                inActiveText={''}

                onValueChange={() => {
                    setSwitchValue(!switchValue);
                    onHandle(!switchValue);
                }}
                value={switchValue}
            />
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={time}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}

        </View>
    );
};

Notify.propTypes = {
    Icon: PropTypes.element,
    rounded: PropTypes.string,
    border: PropTypes.string,
    title: PropTypes.string,
};
export default Notify;