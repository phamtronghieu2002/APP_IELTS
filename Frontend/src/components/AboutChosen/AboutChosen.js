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

const AboutChosen = ({NameChosen, numWord, icon}) => {
    return (
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
            source={icon}
          />

        </View>
        <View className="ml-8">
          <Text className="font-bold">
            {NameChosen}
          </Text>
          <Text className="text-xs text-gray-500 mt-1">
            {numWord} words
          </Text>
        </View>
      </Pressable>
    );
};

export default AboutChosen;