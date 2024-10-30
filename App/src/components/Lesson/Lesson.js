import React, { useEffect, useState } from 'react';
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
import { getData } from '../../utils/asyncStore';


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

    const [key, setKey] = useState(Date.now()); // Khởi tạo key với timestamp

    const category = route?.params?.category;// lấy ra category từ route 
    
    const [lessons, setLessons] = React.useState([]);
   
    const fetchLesson = async () => {
        try {
            const cate_id = category?._id;
            const user =await getData("user");
            const res = await getLessonByCategory(cate_id,user?._id);
            setLessons(res?.data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          setKey(Date.now()); // Cập nhật lại key khi quay về màn hình A
        });
    
        return unsubscribe;
      }, [navigation]);

   console.log("key >>",key);
   
    React.useEffect(() => {
  
        fetchLesson();
    }, [key])
    return (
        <SafeAreaView 
        key={key}
        className="">
            <HeaderScreen
                navigation={navigation}
                style="mt-5"
                label={route?.params?.category?.type}
            />
            <ScrollView
                className="p-4 pl-6 pr-6"
            >
                {
                    lessons?.map((lesson, index) => (
                        <LessonItem
                            key={index}
                            navigation={navigation}
                            refresh ={()=>{                                
                                setKey(Date.now());
                            }}
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