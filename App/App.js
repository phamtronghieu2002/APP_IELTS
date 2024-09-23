import * as React from 'react';

import MyStack from './src/navigators';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux'
import { store } from './src/app/store';


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
        </Provider>



  );
};

export default App;
