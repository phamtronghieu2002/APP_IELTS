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
import Explain from "../Explain/Explain";

const AnswerInputWriting = ({
  data,...props
}) => {
  const {test_id} = props;
  const { is_correct, anwser, isShow, onProgressUpdate} = props;


  const [userAnswer, setUserAnswer] = React.useState([]);
  const [isClickCheck, setIsClickCheck] = useState(false);
  const [showExplain, setShowExplain] = useState(isShow);

  const checkAnswer = async () => {
    let testResult = new Map();
    data.map((item, index) => {
      if (item.is_correct === userAnswer[index]) {
        testResult.set(item.question_id, true); // Use set to add key-value pairs
      } else {
        testResult.set(item.question_id, false); // Use set to add key-value pairs
      }
      onProgressUpdate()
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
    setIsClickCheck(true);
    setShowExplain(true);
  };
  
  const checkiscorrect = (anwser ,index) => {
    if (anwser === userAnswer[index]) {
      return true;
    }
    return false;
  }
  const handelShowExplain = ({item, index}) => {
    return (
      <View className= "mb-3"> 
            <Explain
              is_correct={checkiscorrect(item.is_correct,index)}
              explain={item.explain}
              anwser={item.is_correct}
              type= "writing"
            />
          </View>
    )
  }
  const [countWord, setCountWord] = useState(0);
  return (
    <View className="">
      {data.map((item, index) => {
        return (
          <View>
            <View
            key={index}
            className="flex border-2 border-gray-200 mb-3 rounded-xl
            ">
              <View className="pl-1 pt-1 mb-3 bg-white">
                <Text className="mt-1 font-bold">Your response</Text>
                <Text className="mt-1 text-gray-500 text-xs" >Your words: {countWord}</Text>
              </View>
            <TextInput
              key={index}
              multiline = {true}
              numberOfLines = {4}
              className="text-lg pl-4 pt-1 bg-gray-50 max-w-full mr-2 ml-2 mb-2 border border-gray-300 shadow-lg rounded-lg"
              placeholder="Type your answer....."
              onChangeText={(text) => {
                const words = text.split(' ');
                setCountWord(words.length);
                let temp = [...userAnswer];
                temp[index] = text;
                setUserAnswer(temp);
              }
              }
              editable={!isClickCheck}
            />
          </View>
          {
            isClickCheck && showExplain && handelShowExplain({ is_correct, item, anwser , index})
          }
          
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

export default AnswerInputWriting;