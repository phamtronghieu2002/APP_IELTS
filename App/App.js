import * as React from 'react';

import MyStack from './src/navigators';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux'
import { store } from './src/app/store';
import Toast from 'react-native-toast-message';
import { TestProvider } from './src/providers/TestProvider';
import i18n from './src/i18n/i18n';
import I18nProvider from './src/providers/I18nProvider';

const App = () => {
  return (
    // nguyen thanh doanh
    //trong hieu
    //thanhdoanh
    //test 2


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
};

export default App;
