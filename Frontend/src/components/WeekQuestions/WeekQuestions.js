import React from 'react';

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

import AntDesign from 'react-native-vector-icons/AntDesign';

const Weekquestions = ({typeQuestions, numQuestion, icon}) => {
    return (
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
          className=" rounded-lg w-[100%] h-[60px] bg-white 
          shadow-2xl mb-5">
          <View className="flex flex-row p-2 items-center justify-center">
          <Image
           style={{ width: 40, height: 40 , alignItems:'flex-start' }}
            source={icon} />
            <View className="ml-[15px]">
              <Text className="font-bold">
              {typeQuestions}
              </Text>
              <Text className="">
              {numQuestion} questions
              </Text>
            </View>
            <AntDesign
                                name="right"
                                size={20}
                                color="black"
                                style={{alignItems: 'flex-end', marginLeft: 'auto'}}
                            />
          </View>
        </Pressable>
    );
};

export default Weekquestions;