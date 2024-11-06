import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer'; // Import Drawer Navigator
import { screensStack, screensDrawer } from './config';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { navigationRef } from './NavigationService';

import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home';
import Statistic from '../screens/Statistic/Statistic';
import Setting from '../screens/Setting/Setting';
import Header from '../components/Header/HeaderDraw';
import DrawCustom from '../components/Draw/Draw';
import configs from '../configs';
import { TouchableOpacity } from 'react-native';
import { store } from '../app/store';
import { setGradient, setShowHeaderDraw } from '../fetures/interfaceSlice';
import useLang from '..//hooks/useLang'
import { setOpenModal } from '../fetures/settingSlice';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator(); // Khởi tạo Drawer Navigator



//stack navigator
export const InitStack = ({ navigation, route }) => {

  return (
    <Stack.Navigator>
      {screensStack.map((screen, index) => (
        (screen.name == 'initTab') ? <Stack.Screen options={{ headerShown: false }} key={index} component={MyDrawer} name={configs?.screenName?.initStack} /> :
          <Stack.Screen key={index} {...screen} />
      ))}
    </Stack.Navigator>
  );
}



// Tab Navigator 
export const MyTabs = () => {
  const { t } = useLang();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#ffffff', paddingBottom: 10, paddingTop: 10, height: 60 }, // Style cho tab bar
        tabBarActiveTintColor: '#e91e63', // Màu cho tab đang được chọn

      }}
    >

      <Tab.Screen
        name={'HomeTab'}
        component={Home}

        options={{
          headerShown: false,

          tabBarLabel: t('menuBottom.home'), // Nhãn cho tab

          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" size={size} color={color} />
          ),
          tabBarButton: (props) => {
            return (
              <TouchableOpacity
                {...props}
                onPress={() => {
                  store.dispatch(setGradient(false))
                  store.dispatch(setShowHeaderDraw(true))

                  props.onPress();
                }}
              />
            );
          },


        }}
      />
      <Tab.Screen
        initialParams={{ randomKey: Math.random() }}
        name={'StatisticTab'}
        component={Statistic}
        options={{
          headerShown: false,
          tabBarLabel: t('menuBottom.statiatis'), // Nhãn cho tab
          tabBarIcon: ({ color, size }) => (
            <Icon name="stats-chart-outline" color={color} size={size} />
          ),
          tabBarButton: (props) => {
            const navigation = useNavigation();
            return (
              <TouchableOpacity
                {...props}
                onPress={() => {
                  const userStore = store.getState().user;
                  console.log('====================================');
                  console.log("userStore", userStore);
                  console.log('====================================');
                  if (userStore?.user?.email) {
                    store.dispatch(setGradient(true))
                    store.dispatch(setShowHeaderDraw(true))
                    navigation.setParams({ randomKey: Math.random() });
                    props.onPress();
                  }else{

                    store.dispatch(setOpenModal(true))
                  }
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={'SettingTab'}
        component={Setting}
        options={{
          headerShown: false,
          tabBarLabel: t('menuBottom.setting'), // Nhãn cho tab
          tabBarIcon: ({ color, size }) => (
            <Icon name="settings-outline" color={color} size={size} />
          ),
          tabBarButton: (props) => {
            return (
              <TouchableOpacity
                {...props}
                onPress={() => {
                  store.dispatch(setGradient(false))
                  store.dispatch(setShowHeaderDraw(true))
                  props.onPress();
                }}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};


// Drawer Navigator
const MyDrawer = () => {
  const isShowHeaderDraw = store.getState().interface.isShowHeaderDraw;
  const { t } = useLang();
  return (
    <Drawer.Navigator


      drawerContent={(props) => <DrawCustom {...props} />}
      screenOptions={({ navigation, route }) => ({
        header: () => (
          isShowHeaderDraw ? <Header navigation={navigation} /> : null
        ),
        drawerStyle: {
          width: Dimensions.get('window').width / 1.25,
        },
      })}

      initialRouteName={configs?.screenName?.home}>
      <Drawer.Screen name={configs?.screenName?.home} component={MyTabs} />
      {
        screensDrawer(t).map((screen, index) => (
          <Drawer.Screen key={index} {...screen} />
        ))
      }
    </Drawer.Navigator>
  );
};

// Component chính
const MyStack = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <InitStack />
    </NavigationContainer>
  );
};

export default MyStack;
