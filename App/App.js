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

import { getData } from './src/utils/asyncStore';



import 'firebase/messaging';
import firebase from 'firebase/app';



import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

export default function App() {

  
  // if (!firebase?.apps?.length) {
  //   firebase.initializeApp({
  //     apiKey: "AIzaSyB1KVGw-193zuTNO9i3NrgysoeWOIaiLpE",
  //     projectId: "ieltsapp-a4cfa",
  //     storageBucket: "ieltsapp-a4cfa.appspot.com",
  //     messagingSenderId: "1075445541957",
  //     appId: "1:1075445541957:android:73561303a58c595a26872c",
  //   });
  // }
 
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

