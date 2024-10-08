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
import MainButton from '../Button/MainButton';

const AnswerInputArea = ({
  data,
}) => {
  console.log('====================================');
  console.log("data >>>", data);
  console.log('====================================');
  return (
    <View className="">
      <Text className="text-center mb-3  font-bold">
        Your answer
      </Text>
      {data.map((item, index) => {
        return (
          <View
            key={index}
            className="flex flex-row p-3 bg-gray-50 rounded-lg items-center gap-1
            mb-3">
            <Text className="">
              ({item?.text})
            </Text>
            <TextInput
              key={index}
              className="text-left flex-1  pl-4"
              placeholder="Type your answer"
            />
          </View>
        );
      })
      }
      <MainButton
        title={"Check"}
        roundedfull
      />
    </View>
  );
};

AnswerInputArea.propTypes = {
};
export default AnswerInputArea;