import React,{useState} from 'react';
import PropTypes from 'prop-types';
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
import MainLayout from '../../layouts/MainLayout';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AboutChosen from '../../components/AboutChosen/AboutChosen';
import DropdownSection from '../../components/DropdownSection/DropdownSection';
import CalendarPicker from "react-native-calendar-picker";
import { LinearGradient } from 'expo-linear-gradient';

const Calendar = ({ navigation }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    return (
        <View className='m-3'>
            <Pressable className="ml-1 mt-7 mb-6 flex flex-row items-center">
                <AntDesign
                    name="arrowleft"
                    size={20}
                    color="black"
                    style={{}}
                />
                <Text className="text-black-600 text-x font-bold ml-3">
                    Calendar
                </Text>
            </Pressable>
            <View className="w-[335px] h-[600px] bg-white items-center">
              <CalendarPicker
              onDateChange={(date) => setSelectedDate(date)}
              />
              <Pressable className="mt-7">
                        <LinearGradient
                            colors={[
                                '#040EFA',
                                '#A90859',
                                '#B7084B',
                                '#E10623',
                                '#FF0505',
                            ]} // Define your colors
                            start={{ x: 0, y: 0 }} // Top
                            end={{ x: 1, y: 0 }} // Bottom
                            style={{
                                width: 194,
                                height: 43,
                                borderRadius: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text className="text-xs">Practice now</Text>
                        </LinearGradient>   
                    </Pressable>
            </View>
        </View>
    );
};

Calendar.propTypes = {};
export default Calendar;
