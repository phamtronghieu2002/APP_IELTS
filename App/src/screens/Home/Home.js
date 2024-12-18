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
import MainLayout from '../../layouts/MainLayout';
import { storeData, getData, removeData } from '../../utils/asyncStore';
import configs from '../../configs';
import { getCategories } from '../../services/categoryServices';
import { _groupCategories } from '../../utils/constant';
import { useColorScheme } from 'react-native';
import { NativeWindStyleSheet } from 'nativewind';
import Loading from '../../components/Loading/Loading';
import { ModalConfirm } from '../../components/Modal/ModalConfirm';
import AudioPlayer2 from '../../components/recorder/AudioPlayer2';
import FloatButton from '../../components/FloatButton/FloatButton';
const Home = ({ navigation, route }) => {


  const { colorScheme, toggleColorScheme } = useColorScheme();

  // Thay đổi class NativeWind dựa vào colorScheme
  useEffect(() => {
    NativeWindStyleSheet.setColorScheme("dark"); // Tự động thay đổi theme
  }, [colorScheme]);

  const [loading, setLoading] = React.useState(true)

  const [categories, setCategories] = React.useState({
    skills: [],
    prepare: [],
    practices: []
  })



  const fetchCategorySkills = async () => {
    try {
      const res = await getCategories(_groupCategories?.skills);
      setCategories(prevState => ({
        ...prevState,
        skills: res?.data
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategoriesPractices = async () => {
    try {
      const res = await getCategories(_groupCategories?.practices);
      setCategories(prevState => ({
        ...prevState,
        practices: res?.data
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategoriesPrepare = async () => {
    try {
      const user = await getData('user');
      console.log("accessToken >>>>>>>>>>>", user?.accessToken);

      const res = await getCategories(_groupCategories?.prepare);
      setCategories(prevState => ({
        ...prevState,
        prepare: res?.data
      }));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {

    Promise.all([
      fetchCategorySkills(),
      fetchCategoriesPractices(),
      fetchCategoriesPrepare()
    ]).then(() => {
      setLoading(false)
    }
    )

    // removeData('user')
  }, [])

  return (
    loading ? (
      <Loading />
    ) : (
      <MainLayout>

     
        <Text className="text-red-600 text-xl font-bold">
          IELTS Practice Test
        </Text>
        <ModalConfirm
          navigation={navigation}
        />
        {/* / */}
        <View
          className="wrapper_items mt-4 flex flex-row justify-between flex-wrap  dark:bg-white">
          {

            categories?.skills?.map((item, index) =>
              <Pressable
                key={index}
                onPress={() => {
                  navigation.navigate(configs?.screenName?.lesson, { category: item })
                }}
                style={{
                  // shadown bottom

                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,



                }}
                className=" rounded-lg w-[47%] h-[150px] items-center flex justify-center bg-white 
              shadow-2xl mb-5">
                <Image


                  width={55}
                  height={55}
                  source={{
                    uri: item?.thumb,
                  }}

                />
                <Text className="mt-2">
                  {item?.name_category}
                </Text>
              </Pressable>
            )

          }




        </View>

        {
          categories?.practices?.map((item, index) =>
            <Pressable
              key={index}
              onPress={() => {
                if(item?.type === 'Exam'){
                  navigation.navigate(configs?.screenName?.lesson_exam, { category: item })

                    return
                }
                navigation.navigate(configs?.screenName?.lesson, { category: item })
              }}
              style={{
                marginBottom: 10,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,

              }}
              className="h-[60px] bg-white rounded-xl flex flex-row items-center  pl-3  box-border">
              <View className="w-[45px] h-[40px] bg-gray-300 rounded flex pl-1 justify-center items-center">
                <Image
                  style={{
                    width: 30,
                    height: 35
                  }}
                  source={{
                    uri: item?.thumb
                  }}
                />

              </View>
              <View className="ml-3">
                <Text className="font-bold">
                  {item?.name_category}
                </Text>
               
              </View>
            </Pressable>
          )

        }
        <Text className="text-red-600 text-xl font-bold mt-3">
          IELTS Prep
        </Text>
        {/* <AudioPlayer2 audioUri="https://res.cloudinary.com/dvywo60td/video/upload/v1731143491/cpc54mijizs2qqntpd2d.wav" /> */}

        <View className="wrapper_items mt-4 flex flex-row justify-between flex-wrap">
          {
            categories?.prepare?.map((item, index) =>
              <Pressable
                onPress={() => {
                  navigation.navigate(item?.type, {})
                }}
                key={index}
                style={{
                  // shadown bottom
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
                className=" rounded-lg w-[47%] h-[120px] items-center flex justify-center bg-white 
          shadow-2xl mb-5">
                <Image
                  width={50}
                  height={50}
                  source={{
                    uri: item?.thumb,
                  }}
                />
                <Text className="mt-2">
                  {item?.name_category}
                </Text>
              </Pressable>)
          }
        </View>
 
        <FloatButton
        navigation={navigation}
        />
      </MainLayout>
    )
  );
};

Home.propTypes = {
};
export default Home;