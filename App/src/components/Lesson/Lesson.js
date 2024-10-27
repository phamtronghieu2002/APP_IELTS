import React from 'react';
import PropTypes from 'prop-types'
import {
    View,
    Text,
    Image,
    ScrollView,
    SafeAreaView,
    FlatList,
    SectionList,
    TextInput,
    TouchableOpacity,
    Pressable,
} from 'react-native';
import HeaderScreen from '../Header/HeaderScreen';
import configs from '../../configs';
import LessonItem from './LessonItem';
import IconF from 'react-native-vector-icons/Feather';
import { getLessonByCategory } from '../../services/lessonService';


const IconLesson = [
    {
        type: "Listening",
        icon: "headphones"
    }, {
        type: "Reading",
        icon: "book"
    }, {
        type: "Writing",
        icon: "edit-2"
    }, {
        type: "Speaking",
        icon: "mic"
    }
]
const getLessonIcon = (type) => {
    const icon = IconLesson.find(item => item.type === type)
    return icon?.icon
}

const Lesson = ({ navigation, route }) => {



    const category = route?.params?.category;// lấy ra category từ route 
    
    const [lessons, setLessons] = React.useState([]);
   
    const fetchLesson = async () => {
        try {
            const cate_id = category?._id;
            const res = await getLessonByCategory(cate_id);
            setLessons(res?.data);

        } catch (error) {
            console.log(error);
        }
    }
    React.useEffect(() => {
  
        fetchLesson();
    }, [category])
    return (
        <SafeAreaView className="">
            <HeaderScreen
                navigation={navigation}
                style="mt-5"
                label={`Reading`}
            />
            <ScrollView
                className="p-4 pl-6 pr-6"
            >
                {
                    lessons?.map((lesson, index) => (
                        <LessonItem
                            key={index}
                            navigation={navigation}
                
                            total_question={lesson?.total_question}
                            {...lesson}
                            category={category || "Reading"}
                            icon={<IconF
                                name={getLessonIcon(category?.type)}
                                size={20}
                            />}
                        />
                    ))
                }



            </ScrollView>
        </SafeAreaView>
    );
};

Lesson.propTypes = {
};
export default Lesson;