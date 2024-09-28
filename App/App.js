import * as React from 'react';

import MyStack from './src/navigators';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux'
import { store } from './src/app/store';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    // nguyen thanh doanh
    //trong hieu
    //thanhdoanh
    //test 2


        <Provider store={store}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <MyStack />
          </GestureHandlerRootView>
          <Toast />
        </Provider>



  );
};

export default App;
