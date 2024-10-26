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


Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

export const convertTimeToHHMM = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
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
    
      useEffect(() => {
        const run  = async () => {
        try {
            await scheduleDailyPushNotification();
        } catch (error) {
            console.log("error 3", error);
            
        }
        }
        run();
       
      }
        , []);






        async function scheduleDailyPushNotification() {
            try {
                const now = new Date();
                const hours = 16;  
                const minutes = 1;
              
             
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
        const timeConvert = convertTimeToHHMM(selectedTime);
        setTime(selectedTime);
        const currentTime = selectedTime || time;
        setShow(Platform.OS === 'android');
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
                    onHandle(!switchValue);
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