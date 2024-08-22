import configs from "../configs";
import Profile from "../screens/Profile";
import Icon from "react-native-vector-icons/FontAwesome";
import IconM from 'react-native-vector-icons/MaterialIcons';

export const screensStack = [
    {
        name: 'initTab',
        options: { title: "Welcome MyTab", headerShown: false },
    }, {
        name: configs.screenName.profile,
        component: Profile,
        options: { title: "Welcome Profile", headerShown: true },
    }
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


