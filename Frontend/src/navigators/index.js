import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import screensStack from './config';
const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          screensStack.map((screen, index) => (
            <Stack.Screen
              key={index}
              {...screen}
            />
          ))
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MyStack;