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

const Weekquestions = ({ onPress, typeQuestions, numQuestion, icon }) => {
  return (
    <Pressable
      onPress={onPress}
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
      className="rounded-lg w-[100%] h-[80px] bg-white 
          shadow-2xl mb-5">
      <View className="flex flex-row p-2  pr-5 pl-5 items-center justify-center h-full">
        <Image
          style={{ width: 50, height: 50, alignItems: 'flex-start' }}
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
          style={{ alignItems: 'flex-end', marginLeft: 'auto' }}
        />
      </View>
    </Pressable>
  );
};

export default Weekquestions;