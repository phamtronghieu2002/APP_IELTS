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
import { CircularProgress } from 'react-native-svg-circular-progress';

const ProgressSkill = ({ skill, questionDone, allQuestion, progress, icon, onPress }) => {
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
      className=" rounded-lg w-[47%] h-[137px] bg-white 
          shadow-2xl mb-5">
      <View className="flex flex-row justify-between p-2">
        <Image
          style={{ width:50, height:50 }}
          source={icon} />
        <CircularProgress
          percentage={progress} // giá trị phần trăm của tiến trình
          donutWidth={1}  // độ rộng của vòng tròn
          size={55}
          progressWidth={23}     // kích thước của vòng tròn
          children={<Text style={{ fontSize: 15, color: 'black' }}>{progress?.toFixed(0)}%</Text>} // hiển thị phần trăm
          blankColor="#F2B5AA" // màu của vòng tròn
          donutColor="#E66D57" // màu của vòng tròn tiến trình
        />
      </View>
      <View className="pl-2">
        <Text className="mt-2 text-red-500 font-bold">
          {skill}
        </Text>
        <Text className="mt-0.5">
          {questionDone}/{allQuestion} Answered
        </Text>
      </View>
    </Pressable>
  );
};

export default ProgressSkill;