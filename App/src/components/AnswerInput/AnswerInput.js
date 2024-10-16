import React, { useState } from 'react';
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
import { addAnwserToTestResult } from '../../services/testResultServices';
import { _testTypes } from '../../utils/constant';

const AnswerInputArea = ({
  data,...props
}) => {
  const {test_id, is_doing} = props;


  console.log('====================================');
  console.log("datalmao >>>>>>>>>>>>", data);
  console.log('====================================');

  const [userAnswer, setUserAnswer] = React.useState([]);
  const [isClickCheck, setIsClickCheck] = useState(false);

  const checkAnswer = async () => {
    console.log("ddddddddddddddddddddddddddddata >>>", data);
    console.log("userAnswer >>>", userAnswer);
    let testResult = new Map();
    data.map((item, index) => {
      if (item.is_correct === userAnswer[index]) {
        testResult.set(item.question_id, true); // Use set to add key-value pairs
      } else {
        testResult.set(item.question_id, false); // Use set to add key-value pairs
      }
    });
    const testResultArray = Array.from(testResult, ([question_id, is_correct]) => ({ question_id, is_correct }));
  
    testResultArray.map(async (item) => {
      try {
        await addAnwserToTestResult(test_id, _testTypes?.new, {
          anwser: item
        });
      } catch (error) {
        console.error(error);
      }
    }
    );
    console.log("testResult >>>", testResultArray);
    setIsClickCheck(true);
  };
  
  


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
              onChangeText={(text) => {
                let temp = [...userAnswer];
                temp[index] = text;
                setUserAnswer(temp);
              }
              }
              editable={!isClickCheck}
            />
          </View>
        );
      })
      }
      <MainButton
        title={"Check"}
        roundedfull
        onPress={checkAnswer}
        disabled={isClickCheck}
      />
    </View>
  );
};

AnswerInputArea.propTypes = {
};
export default AnswerInputArea;