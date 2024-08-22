import * as React from 'react';

import MyStack from './src/navigators';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { Provider } from 'react-redux'
// import { store } from './app/store'

const App = () => {
  return (
    // nguyen thanh doanh
    //trong hieu
    // const x =10; =>>nguyen doanh =>hihihi
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MyStack />
    </GestureHandlerRootView>

  );
};

export default App;