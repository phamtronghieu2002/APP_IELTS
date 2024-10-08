import * as React from 'react';

import MyStack from './src/navigators';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux'
import { store } from './src/app/store';
import Toast from 'react-native-toast-message';
import { TestProvider } from './src/providers/TestProvider';

const App = () => {
  return (
    // nguyen thanh doanh
    //trong hieu
    //thanhdoanh
    //test 2


    <Provider store={store}>
      <TestProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <MyStack />
        </GestureHandlerRootView>
        <Toast />
      </TestProvider>
    </Provider>



  );
};

export default App;
