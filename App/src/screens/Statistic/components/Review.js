import React, { useEffect } from 'react';
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
import MainLayout from '../../../layouts/MainLayout';
import HeaderScreen from '../../../components/Header/HeaderScreen';
import { use } from 'i18next';
import ReadingTest from '../../../components/Lesson/Test/ReadingTest';
import { getAllTestResult } from '../../../services/testResultServices';
const Review = ({ navigation, route }) => {


    const status = route?.params?.status;

    const [data, setData] = React.useState([]);
    const [testResults, setTestResults] = React.useState([]);
    const [part, setPart] = React.useState(0);





    const handleData = async () => {


        const res = await getAllTestResult();
        const feedback = res?.data
        setData(feedback);

        let fb = {};
        if (status === 'weak') {
            fb = feedback?.map(item => {
                return item?.anwsers?.filter(item => item.is_correct === false)
            })



        } else if (status === 'familiar') {
            fb = feedback?.map(item => {
                return item?.anwsers?.filter(item => item.is_correct)
            })

        } else {
            const bookmark_filter = feedback?.filter(item => {
                return item?.bookmark === true
            })
            setData(bookmark_filter)
        }
        setTestResults(fb?.filter((item, index) => {
            if (item.length > 0) {

                return true
            }
            feedback?.splice(index, 1)
            setData((pev) => [...pev])
            return false
        }));
    }



    useEffect(() => {
        handleData()
    }, [])

    const dataStasitic = () => {

        if (status == 'bookmark') {

            return {
                test_id: data[part]?.test_id?._id,
                name_test: data[part]?.test_id?.name_test,
                testResults: [],
            }
        }

    }

    return (
        <MainLayout>
            <HeaderScreen
                navigation={navigation}
                label={`Làm lại Test: ${data[part]?.test_id?.name_test}`}
            />
            <View className="content">

                <ReadingTest
                    part={part}
                    onNextPart={() => {
                        if (part < data.length - 1) {
                            setPart(part + 1)
                        }
                    }
                    }
                    headershow={false}
                    dataStasitic={
                        dataStasitic()
                    }

                />
            </View>
        </MainLayout>
    );
};

Review.propTypes = {
};
export default Review;