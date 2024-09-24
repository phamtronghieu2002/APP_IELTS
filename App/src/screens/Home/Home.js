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
import MainLayout from '../../layouts/MainLayout';

const Home = ({ navigation, route }) => {
  return (
    <MainLayout>
      <Text className="text-red-600 text-xl font-bold">
        IELTS Practice Test
      </Text>
      <Text className="">
        {route?.params?.userInfo?.photo}


      </Text>
      {/* / */}
      <View
        //style box shadow

        className="wrapper_items mt-4 flex flex-row justify-between flex-wrap">
        <Pressable
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
            width={50}
            height={50}
            source={require('../../../assets/home/reading.png')} />
          <Text className="mt-2">
            Reading
          </Text>
        </Pressable>

        <Pressable
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
            width={50}
            height={50}
            source={require('../../../assets/home/listening.png')} />
          <Text className="mt-2">
            Reading
          </Text>
        </Pressable>

        <Pressable
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
            width={50}
            height={50}
            source={require('../../../assets/home/writting.png')} />
          <Text className="mt-2">
            Reading
          </Text>
        </Pressable>

        <Pressable
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
            width={50}
            height={50}
            source={require('../../../assets/home/reading.png')} />
          <Text className="mt-2">
            Reading
          </Text>
        </Pressable>
      </View>
      {/*  */}

      <Pressable
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
            source={require('../../../assets/home/book1.png')}
          />

        </View>
        <View className="ml-3">
          <Text className="font-bold">
            IELTS Vocabulary
          </Text>
          <Text className="text-xs text-gray-500 mt-1">
            3000 words
          </Text>
        </View>
      </Pressable>
      <Pressable
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
            source={require('../../../assets/home/book1.png')}
          />

        </View>
        <View className="ml-3">
          <Text className="font-bold">
            IELTS Vocabulary
          </Text>
          <Text className="text-xs text-gray-500 mt-1">
            3000 words
          </Text>
        </View>
      </Pressable>
      <Text className="text-red-600 text-xl font-bold mt-3">
        IELTS Prep
      </Text>
      <View className="wrapper_items mt-4 flex flex-row justify-between flex-wrap">
        <Pressable
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
            source={require('../../../assets/home/reading.png')} />
          <Text className="mt-2">
            Reading
          </Text>
        </Pressable>

      </View>
    </MainLayout>
  );
};

Home.propTypes = {
};
export default Home;