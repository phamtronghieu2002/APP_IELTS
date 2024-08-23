import configs from "../configs";
import Login from "../screens/Login/Login";
import Profile from "../screens/Profile";
import Icon from "react-native-vector-icons/FontAwesome";
import IconM from 'react-native-vector-icons/MaterialIcons';
import Register from "../screens/Register/Register";
import Notifycation from "../screens/Notifycation/Notifycation";
import Term from "../screens/Term/Term";

export const screensStack = [
    {
        name: 'initTab',
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
        options: { title: "Welcome Logins", headerShown: false },
    },

]
export const screensDrawer = [
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
                <IconM name="feedback" size={20} color="#000" />
            ),
        },

    },
    {
        name: configs.screenName.share,
        component: Profile,
        options: {
            title: "Welcome Profile", headerShown: true,
            drawerIcon: ({ focused, color, size }) => (
                <IconM name="share" size={20} color="#000" />
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
                <IconM name="folder" size={20} color="#000" />
            ),
        },

    },
    {
        name: configs.screenName.termAndCondition,
        component: Profile,
        options: {
            title: "Welcome Profile", headerShown: true,
            drawerIcon: ({ focused, color, size }) => (
                <IconM name="privacy-tip" size={20} color="#000" />
            ),
        },

    },
    {
        name: configs.screenName.signOut,
        component: Profile,
        options: {
            title: "Welcome Profile", headerShown: true, drawerIcon: ({ focused, color, size }) => (
                <Icon name="sign-out" size={20} color="#000" />
            ),
        },

    }

]


