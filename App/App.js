import * as React from 'react';

import MyStack from './src/navigators';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux'
import { store } from './src/app/store';
import Toast from 'react-native-toast-message';
import { TestProvider } from './src/providers/TestProvider';
import i18n from './src/i18n/i18n';
import I18nProvider from './src/providers/I18nProvider';


import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { getData } from './src/utils/asyncStore';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


// const App = () => {

//   return (
//     // nguyen thanh doanh
//     //trong hieu
//     //thanhdoanh
//     //test 2






//   );
// };

// export default App;


export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

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
      await scheduleDailyPushNotification();
    }
    // run();
   
  }
    , []);
  return (

        <Provider store={store}>

        <I18nProvider>
          <TestProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <MyStack />
            </GestureHandlerRootView>
            <Toast />
          </TestProvider>
        </I18nProvider>

    </Provider>

  );
}

async function scheduleDailyPushNotification() {
  const now = new Date();
  const hours = 22;  // 8:00 PM
  const minutes = 54;

  // Tính thời gian đến 8:00 PM hôm nay hoặc ngày mai nếu hiện tại đã qua 8:00 PM
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
      title: "Time to check!",
      body: "This is your daily 8:00 PM notification",
      data: { data: 'goes here' },
    },
    trigger: {
      hour: hours,
      minute: minutes,
      repeats: true,  // Để lặp lại hằng ngày
    },
  });
}

async function registerForPushNotificationsAsync() {
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
}

