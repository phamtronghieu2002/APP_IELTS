import React, { useState } from 'react';
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
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' }
  ]);

  const onHandleLightMode = (value) => { console.log(value) };

  const onHandleTime = (value) => { console.log(value) };

  const onHandleLanguage = (value) => { console.log(value) };
  return (
    <View className='p-5 pt-3 mt-5'>
      <View
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
        className='rounded-2xl pr-1'>
        <View className="pl-2 pr-2 bg-white">
          <View className="border border-t-0 border-r-0 border-l-0 border-slate-300  flex flex-row items-center justify-between pl-2 pr-2 bg-white h-[55px] ">
            <View className="flex flex-row justify-center">
              <Image className="" source={require('../../../assets/Setting/Sun.png')} style={{ width: 25, height: 25 }} />
              <Text className="ml-3">
                Light Mode
              </Text>
            </View>
            <View className="mr-2">
              <Switch
                circleSize={20}
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
          </View>
          <Notify
            textStyle="text-sm ml-[-30px]"
            circleSize={20}
            rounded={''}
            Icon={<FontAwesome name="bell-o" size={20} color="#000" />}
            title={'Notifycation'}
            onHandle={onHandleTime}
            backGround={'bg-white border border-t-0 border-r-0 border-l-0 border-slate-300'}
            border='none'
          />
          <View className="flex flex-row items-center justify-between pl-2 pr-2 bg-white h-[67px]">
            <View className="flex flex-row justify-center">
              <Image className="" source={require('../../../assets/Setting/Sun.png')} style={{ width: 25, height: 25 }} />
              <Text className="ml-3">
                Your language
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

Setting.propTypes = {
};
export default Setting;