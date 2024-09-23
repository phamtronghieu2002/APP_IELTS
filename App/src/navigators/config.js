import configs from "../configs";
import Login from "../screens/Login/Login";
import Profile from "../screens/Profile";

import Register from "../screens/Register/Register";
import Notifycation from "../screens/Notifycation/Notifycation";
import Term from "../screens/Term/Term";
import Setting from "../screens/Setting/Setting";
import statistic from "../screens/Statistic/Statistic";
import About from "../screens/About/About";
import Tips from "../screens/Tips/Tips";
import Practice from "../screens/Practice/Practice";
import PracticeTest from "../screens/PraticeTest/PraticeTest";
import Calendar from "../screens/Calendar/Calendar";
import Icon from "react-native-vector-icons/FontAwesome5";
export const screensStack = [
    {
        name: 'initTab',
        options: { title: "Welcome MyTab", headerShown: false },
    },
    {
        name: configs.screenName.calendar,
        component: Calendar,
        options: { title: "Welcome MyTab", headerShown: false },
    },
    {
        name: configs.screenName.PracticeTest,
        component: PracticeTest,
        options: { title: "Welcome MyTab", headerShown: false },
    },
    {
        name: configs.screenName.practice,
        component: Practice,
        options: { title: "Welcome MyTab", headerShown: false },
    },
    {
        name: configs.screenName.tips,
        component: Tips,
        options: { title: "Welcome profile", headerShown: false },
    },
    {
        name: configs.screenName.about,
        component: About,
        options: { title: "Welcome profile", headerShown: false },
    },
    {
        name: configs.screenName.statistic,
        component: statistic,
        options: { title: "Welcome MyTab", headerShown: false },
    },
    {
        name: configs.screenName.setting,
        component: Setting,
        options: { title: "Welcome profile", headerShown: true },
    },
    {
        name: configs.screenName.profile,
        component: Profile,
        options: { title: "Welcome profile", headerShown: true },
    },
    {
        name: configs.screenName.termAndCondition,
        component: Term,
        options: { title: "Welcome Notifycation", headerShown: true },
    },
    {
        name: configs.screenName.notifycation,
        component: Notifycation,
        options: { title: "Welcome Notifycation", headerShown: false },
    },
    {
        name: configs.screenName.register,
        component: Register,
        options: { title: "Welcome Logins", headerShown: false },
    },
    {
        name: configs.screenName.login,
        component: Login,
        options: { title: "Welcome Logins", headerShown: true },
    },

]

export const screensDrawer = [
    // tôi cần chỗ này 
    {
      name: configs.screenName.login,
      component: Login,
      options: {
        title: "Welcome Profile",
        headerShown: false,
        drawerIcon: ({ focused, color, size }) => (
          <Icon name="sign-out" size={20} color="#000" />
        ),
        
      },
  
  
    }
  
  ]


