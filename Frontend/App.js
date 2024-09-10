import * as React from 'react';

import MyStack from './src/navigators';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
// import { Provider } from 'react-redux'
// import { store } from './app/store'

const App = () => {

 
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MyStack />
      <Toast />
    </GestureHandlerRootView>

  );
};

export default App;