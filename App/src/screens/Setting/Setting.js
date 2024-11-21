import React, { useContext, useEffect, useState } from 'react';
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
import RNPickerSelect from 'react-native-picker-select';
import { getData, removeData, storeData } from '../../utils/asyncStore';
import { i18nContext } from '../../providers/I18nProvider';

import { useColorScheme } from 'react-native';
import { ThemeContext } from '../../providers/ThemeProvider';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const Setting = () => {

  const [switchLightMode, setSwitchLightMode] = useState(false);
  const { i18n, t } = useContext(i18nContext);

  const [items, setItems] = useState([
    { label: 'Vietnamese', value: 'vi' },
    { label: 'English', value: 'en' }
  ]);

  const [lang, setLang] = useState("vi");

  const onHandleLightMode = (value) => {

  };
  console.log("lang state", lang);

  const onHandleTime = (value) => { console.log(value) };



  const onHandleLanguage = async (value) => {
    try {

      console.log("value", value);

      await storeData("langs", { value });
      setLang(value);
      i18n.changeLanguage(value);

    } catch (error) {

    }

  };

  useEffect(() => {


    const handleLang = async () => {
      const currentLang = await getData("langs");
      console.log("currentLang >>>>>>", currentLang);

      if (currentLang) {
        setLang(currentLang?.value ?? "vi");
      }
    }
    handleLang();
  }, []);




  const selectedItem = {
    title: 'Selected item title',
    description: 'Secondary long descriptive text ...',
  };

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
                {
                  t('setting.lightMode')
                }
              </Text>
            </View>
            <View className="mr-2">
              <Switch


                circleSize={20}
                backgroundActive={'#06ba39'}
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
            title={t('setting.notification')}
            onHandle={onHandleTime}
            backGround={'bg-white border border-t-0 border-r-0 border-l-0 border-slate-300'}
            border='none'
          />
          <View className="flex flex-row items-center justify-between pl-2 pr-2 bg-white h-[67px]">
            <View className="flex flex-row items-center justify-between flex-1">
              <View className="content-left flex flex-row">
                <Image className="" source={require('../../../assets/Setting/lang.png')} style={{ width: 23, height: 23 }} />
                <Text className="ml-3">
                  {t('setting.language')}
                </Text>
              </View>
              <View

                className="rounded-full border-gray-300 h-[30px] pl-3 w-[80px] content-right flex flex-row items-center border justify-center">
                <Text className="">
                  {lang}
                </Text>
                <View className="">
                  <RNPickerSelect
                    onValueChange={(value) => onHandleLanguage(value)} // Hàm xử lý khi chọn một item
                    items={items} // Dữ liệu dropdow
                    placeholder={{ label: 'Select your language', value: lang }} // Placeholder nếu cần
                    pickerProps={{
                      accessibilityLabel: selectedItem.title,
                    }}
                    style={{
                      inputIOS: {
                        fontSize: 16,
                        paddingVertical: 12,
                        paddingHorizontal: 10,
                        borderWidth: 1,
                        borderColor: 'gray',
                        borderRadius: 4,
                        color: 'black',
                        paddingRight: 30, // to ensure the text is never behind the icon
                      },
                      inputAndroid: {
                        fontSize: 16,
                        paddingHorizontal: 10,
                        paddingVertical: 8,
                        borderWidth: 0.5,
                        borderColor: 'purple',
                        borderRadius: 8,
                        color: 'black',
                        paddingRight: 30, // to ensure the text is never behind the icon
                      },
                    }}
                  />
                </View>
              </View>
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