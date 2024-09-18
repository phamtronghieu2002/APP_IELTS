import React,{useState} from 'react';
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
import MainLayout from '../../layouts/MainLayout';
import Notify from '../../components/Notify/Notify';

import { Switch } from 'react-native-switch';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Setting = () => {
    
    const [switchLightMode, setSwitchLightMode] = useState(false);

    // DropDownPicker
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Apple', value: 'apple'},
        {label: 'Banana', value: 'banana'}
    ]);

    const onHandleLightMode = (value) => {console.log(value)};
    
    const onHandleTime = (value) => {console.log(value)};

    const onHandleLanguage = (value) => {console.log(value)};
    return (
        <View className='p-5 pt-3'>
            <View className=''>
                <View className="flex flex-row items-center justify-between pl-2 pr-2 bg-white h-[67px] rounded-xl">
                  <View className="flex flex-row justify-center">
                    <Image className="" source={require('../../../assets/Setting/Sun.png')} style={{width:25,height:25}} />
                    <Text className="ml-3">
                      Light Mode
                    </Text>
                  </View>
                  <Switch
                backgroundActive={'#FFFF00'}
                activeText={''}
                inActiveText={''}
                onValueChange={() => {
                    setSwitchLightMode(!switchLightMode);
                    onHandleLightMode(!switchLightMode);
                }}
                value={switchLightMode}
            />
                </View>
                <Notify
                    rounded={'rounded-xl'}
                    Icon={<FontAwesome name="bell-o" size={20} color="#000" />}
                    title={'Notifycation'}
                    onHandle={onHandleTime}
                    backGround={'bg-white'}
                    border='none'
                />
                <View className="flex flex-row items-center justify-between pl-2 pr-2 bg-white h-[67px] rounded-xl">
                  <View className="flex flex-row justify-center">
                    <Image className="" source={require('../../../assets/Setting/Sun.png')} style={{width:25,height:25}} />
                    <Text className="ml-3">
                    Your language
                    </Text>
                  </View>
                </View>
            </View>
        </View>
    );
};

Setting.propTypes = {
};
export default Setting;