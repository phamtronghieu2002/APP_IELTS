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
import Policy from "../screens/Policy/Policy";
import AboutIelts from "../screens/About/AboutIelts";
import AboutDetail from "../screens/About/AboutDetail";
import Tip from "../screens/Tips/Tips";
import TipDetail from "../screens/Tips/TipDetail";
import TipContent from "../screens/Tips/TipContent";
import Record from "../screens/Record/Record";
import { removeData } from "../utils/asyncStore";
import { store } from "../app/store";
import { logoutUser } from "../fetures/userSlice";
import Review from "../screens/Statistic/components/Review";
import { setOpenModal } from "../fetures/settingSlice";
import Comment from "../screens/Comment/Comment";
import { handleSendEmail } from "../utils";
import VocabularyLeaning from "../components/Vocabulary/VocabularyLeaning";
import OverviewVocabulary from "../screens/Overview/OverviewVocabulary";
import VocabularyPlay from "../components/Vocabulary/VocabularyPlay";
import Grammar from "../components/Grammar/Grammar";
import Dictionary from "../screens/Dictionary/Dictionary";
import Exam from "../screens/Exam/Exam";
import LessonExam from "../components/Lesson/LessonExam";
import OverviewExam from "../screens/Overview/OverviewExam";
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
        name: configs.screenName.record,
        component: Record,
        options: { title: "Welcome profile", headerShown: false },
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
        name: configs.screenName.comment,
        component: Comment,
        options: { title: "Welcome MyTab", headerShown: false },
    },
    {
        name: configs.screenName.practice,
        component: Practice,
        options: { title: "Welcome MyTab", headerShown: false },
    },
    {
        name: configs.screenName.tips,
        component: Tip,
        options: { title: "Welcome profile", headerShown: false },
    }, {
        name: configs.screenName.tipDetail,
        component: TipDetail,
        options: { title: "Welcome profile", headerShown: false },
    },
    , {
        name: configs.screenName.tipContent,
        component: TipContent,
        options: { title: "Welcome profile", headerShown: false },
    },
    {
        name: configs.screenName.about,
        component: About,
        options: { title: "Welcome profile", headerShown: false },
    },
    {
        name: configs.screenName.about_detail,
        component: AboutDetail,
        options: { title: "Welcome profile", headerShown: false },
    },
    {
        name: configs.screenName.statistic,
        component: statistic,
        options: { title: "Welcome MyTab", headerShown: false },
    },
    {
        name: configs.screenName.review,
        component: Review,
        options: { title: "Welcome MyTab", headerShown: false },
    },

    {
        name: configs.screenName.dictionary,
        component: Dictionary,
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
    {
        name: configs.screenName.vocabulary_leaning,
        component: VocabularyLeaning,
        options: { title: "Welcome Logins", headerShown: false, },

    },
    {
        name: configs.screenName.overview_vocabulary,
        component: OverviewVocabulary,
        options: { title: "Welcome Logins", headerShown: false, },

    },
    {
        name: configs.screenName.vocabulary_play,
        component: VocabularyPlay,
        options: { title: "Welcome Logins", headerShown: false, },

    },
    {
        name: configs.screenName.lesson_exam,
        component: LessonExam,
        options: { title: "Welcome Logins", headerShown: false, },

    },
    {
        name: configs.screenName.overview_exam,
        component: OverviewExam,
        options: { title: "Welcome Logins", headerShown: false, },

    },
    {
        name: configs.screenName.Grammar,
        component: Grammar,
        options: { title: "Welcome Logins", headerShown: false, },

    },
    {
        name: configs.screenName.Exam,
        component: Exam,
        options: { title: "Welcome Logins", headerShown: false, },

    },
    // {
    //     name: configs.screenName.about,
    //     component: AboutIelts,
    //     options: { title: "Welcome Logins", headerShown: false, },

    // },


]

export const screensDrawer = (t) => [
    // tôi cần chỗ này 


    {
        label: t?.('draw.feedback'),
        name: configs.screenName.feedback,
        component: Profile,
        options: {
            title: "Welcome Profile", headerShown: true,
            drawerIcon: ({ focused, color, size }) => (
                <IconM name="feedback" size={20} color={color} />
            ),
        },
        cb: () => {
            handleSendEmail()
        }

    },
    {
        label: t?.('draw.share'),

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
        label: t?.('draw.privacy'),
        name: configs.screenName.privacy,
        component: Policy,
        options: {
            title: "Welcome Profile", headerShown: true,
            drawerIcon: ({ focused, color, size }) => (
                <IconM name="folder" size={20} color={color} />
            ),
            headerShown: false
        },

    },
    {
        label: t?.('draw.terms'),
        name: configs.screenName.termAndCondition,
        component: Term,
        options: {
            title: "Welcome Profile", headerShown: true,
            drawerIcon: ({ focused, color, size }) => (
                <IconM name="privacy-tip" size={20} color={color} />
            ),
            headerShown: false
        },

    },
    {
        label: t?.('draw.login'),
        lable2: t?.('draw.logout'),
        name: configs.screenName.login,
        component: Login,
        options: {
            title: "Welcome Profile",
            headerShown: false,
            drawerIcon: ({ focused, color, size }) => (
                <Icon className="font-light" name="sign-out" size={20} color={color} />
            ),

        },
        cb: () => {
            removeData('user')
            store?.dispatch(logoutUser())
            store?.dispatch(setOpenModal(false))

        }


    },
]


