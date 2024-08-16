import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './navigators';
import { Provider } from 'react-redux'
// import { store } from './app/store'
import { View,Text } from 'react-native';
const App = () => {
  return (
 
     
      <MyStack />
    
  );
};

export default App;