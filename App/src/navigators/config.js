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
import Icon from "react-native-vector-icons/FontAwesome";
import IconM from 'react-native-vector-icons/MaterialIcons';
import Intro from "../screens/Intro/Intro";
import Lesson from "../components/Lesson/Lesson";
import Overview from "../screens/Overview/Overview";
import ReadingTest from "../components/Lesson/Test/ReadingTest";
import ListeningTest from "../components/Lesson/Test/ListeningTest";
import SpeakingTest from "../components/Lesson/Test/SpeakingTest";
import WritingTest from "../components/Lesson/Test/WritingTest";
export const screensStack = [
    {
        name: configs.screenName.introduce,
        component: Intro,
        options: { title: "Welcome profile", headerShown: false },
    },
    {
        name: 'initTab',
        options: { title: "Welcome MyTab", headerShown: false },
    },

    {
        name: configs.screenName.setting,
        component: Setting,
        options: { title: "Welcome profile", headerShown: true },
    },
    {
        name: configs.screenName.overview,
        component: Overview,
        options: { title: "Welcome profile", headerShown: false },
    },
    {
        name: configs.screenName.reading,
        component: ReadingTest,
        options: { title: "Welcome profile", headerShown: false },
    },
    {
        name: configs.screenName.listening,
        component: ListeningTest,
        options: { title: "Welcome profile", headerShown: false },
    },
    {
        name: configs.screenName.speaking,
        component: SpeakingTest,
        options: { title: "Welcome profile", headerShown: false },
    },
    {
        name: configs.screenName.writing,
        component: WritingTest,
        options: { title: "Welcome profile", headerShown: false },
    },
    {
        name: configs.screenName.lesson,
        component: Lesson,
        options: { title: "Welcome profile", headerShown: false },
    },
    {
        name: configs.screenName.notifycation,
        component: Notifycation,
        options: { title: "Welcome Notifycation", headerShown: false },
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
        name: configs.screenName.register,
        component: Register,
        options: { title: "Welcome Logins", headerShown: false },
    },
    {
        name: configs.screenName.login,
        component: Login,
        options: { title: "Welcome Logins", headerShown: false, },

    },


]

export const screensDrawer = [
    // tôi cần chỗ này 

    {
        name: configs.screenName.profile,
        component: Profile,
        options: {
            title: "Welcome Profile", headerShown: true,
            drawerIcon: ({ focused, color, size }) => (
                <Icon name="user" size={size} color={color} />
            ),
        },


    },
    {
        name: configs.screenName.feedback,
        component: Profile,
        options: {
            title: "Welcome Profile", headerShown: true,
            drawerIcon: ({ focused, color, size }) => (
                <IconM name="feedback" size={20} color={color} />
            ),
        },

    },
    {
        name: configs.screenName.share,
        component: Profile,
        options: {
            title: "Welcome Profile", headerShown: true,
            drawerIcon: ({ focused, color, size }) => (
                <IconM name="share" size={20} color={color} />
            ),
        },

    }
    ,
    {
        name: configs.screenName.privacy,
        component: Profile,
        options: {
            title: "Welcome Profile", headerShown: true,
            drawerIcon: ({ focused, color, size }) => (
                <IconM name="folder" size={20} color={color} />
            ),
        },

    },
    {
        label: "Term and Condition",
        name: configs.screenName.termAndCondition,
        component: Profile,
        options: {
            title: "Welcome Profile", headerShown: true,
            drawerIcon: ({ focused, color, size }) => (
                <IconM name="privacy-tip" size={20} color={color} />
            ),
        },

    },
    {
        name: configs.screenName.login,
        component: Login,
        options: {
            title: "Welcome Profile",
            headerShown: false,
            drawerIcon: ({ focused, color, size }) => (
                <Icon className="font-light" name="sign-out" size={20} color={color} />
            ),

        },


    },
]


