import React, { useEffect, useRef } from 'react';
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
  Platform
} from 'react-native';
import { useState } from 'react';
import { Switch } from 'react-native-switch';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { getData, removeData, storeData } from '../../utils/asyncStore';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const convertTimeToHHMM = (date) => {
  console.log("date", date);

  const hours = date?.getHours?.()?.toString?.()?.padStart(2, '0');
  const minutes = date?.getMinutes?.()?.toString?.()?.padStart(2, '0');
  return `${hours}:${minutes}`;
};

const Notify = ({ textStyle = "text-lg", Icon, rounded, border = 'border', title = 'Notifycation', onHandle, backGround, className, circleSize }) => {
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);


  const notificationListener = useRef();
  const responseListener = useRef();


  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);


  const initTime = async () => {
    // removeData('time');
    const time = await getData('time');

    if (!time?.active) {
      cancelAllScheduledNotifications();
    }

    if (time) {

      const current_time = time?.timeSetting;

      setTime(new Date(current_time));
      const getHour = current_time.getHours();
      const getMinute = current_time.getMinutes();
      run(getHour, getMinute);
    } else {
      storeData('time', {
        timeSetting: new Date(),
        active: false
      });
    }
  };

  useEffect(() => {

    initTime();
  }, [switchValue]);
  useEffect(() => {
    if (switchValue && time) {
      const getHour = time.getHours();
      const getMinute = time.getMinutes();
      run(getHour, getMinute);
    }
  }, [time]);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);



  const run = async (hour, minute) => {
    try {
      await scheduleDailyPushNotification(hour, minute);
    } catch (error) {
      console.log("error 3", error);

    }
  }




  async function cancelAllScheduledNotifications() {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      console.log("Đã hủy tất cả thông báo đã lên lịch.");
    } catch (error) {
      console.log("error khi hủy thông báo:", error);
    }
  }


  async function scheduleDailyPushNotification(hour, minute) {
    try {
      const now = new Date();
      const hours = hour;
      const minutes = minute;


      let triggerDate = new Date(now);
      triggerDate.setHours(hours);
      triggerDate.setMinutes(minutes);
      triggerDate.setSeconds(0);

      if (triggerDate < now) {
        // Nếu đã qua 8:00 PM, đặt lịch cho ngày mai
        triggerDate.setDate(triggerDate.getDate() + 1);
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Đến giờ học Ielts rồi vô học điiiii!",
          body: "Đây là thông báo thời gian học tập nha!!!",
          data: { data: 'lets do it' },
        },
        trigger: {
          hour: hours,
          minute: minutes,
          repeats: true,  // Để lặp lại hằng ngày
        },
      });
    } catch (error) {
      console.log("error 2 >>", error);

    }
  }

  async function registerForPushNotificationsAsync() {
    try {
      let token;

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
        token = (await Notifications.getExpoPushTokenAsync({ projectId: 'your-project-id' })).data;
        console.log(token);
      } else {
        alert('Must use physical device for Push Notifications');
      }

      return token;
    } catch (error) {
      console.log("error 1", error);

    }
  }




  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShow(Platform.OS === 'android');
    storeData('time',
      {
        timeSetting: currentTime,
        active: switchValue
      }
    );
    setTime(currentTime);
  };

  const showTimepicker = () => {
    DateTimePickerAndroid.open({
      value: time,
      onChange,
      mode: 'time',
      is24Hour: true,


    });
  };

  return (

    <View className={`${rounded} ${border}  ${backGround}  w-[100%] h-[67px] flex flex-row items-center justify-between pl-4 pr-4 ${className}`}>
      {Icon}
      <Text className={textStyle}>{title}</Text>

      <Pressable
        onPress={showTimepicker}

        className="shadow-md rounded-lg  w-[90px] h-[34px] border border-slate-300 hover:border-indigo-300flex flex-row items-center justify-center">
        <TouchableOpacity onPress={showTimepicker} className="mr-3">
          <Text className="text-lg">{convertTimeToHHMM(time)}</Text>
        </TouchableOpacity>

        {<FontAwesome name="caret-down" size={20} color="#000" />}
      </Pressable>
      {/* switch button here */}
      <Switch
        backgroundActive={'#FFFF00'}
        activeText={''}
        inActiveText={''}
        circleSize={circleSize}
        onValueChange={() => {

          setSwitchValue(!switchValue);
          storeData('time', {
            timeSetting: time,
            active: !switchValue
          });
        }}
        value={switchValue}
      />



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