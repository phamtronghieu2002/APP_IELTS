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

const AnswerInputArea = ({
  data,...props
}) => {
  const {test_id, is_doing} = props;
  const { is_correct, explain, anwser, isShow, currentquestion, onProgressUpdate, onShowNextQuestion} = props;


  const [userAnswer, setUserAnswer] = React.useState([]);
  const [isClickCheck, setIsClickCheck] = useState(false);
  const [showExplain, setShowExplain] = useState(isShow);

  const checkAnswer = async () => {
    let testResult = new Map();
    data.map((item, index) => {
      if (item.is_correct === userAnswer[index]) {
        testResult.set(item.option_id, true); // Use set to add key-value pairs
      } else {
        testResult.set(item.option_id, false); // Use set to add key-value pairs
      }
      onProgressUpdate()
    });
    const testResultArray = Array.from(testResult, ([question_id, is_correct]) => ({ question_id, is_correct }));
  
    testResultArray.forEach(async (item) => {
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
    onShowNextQuestion();
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
              type= "normal"
            />
          </View>
    )
  }
  return (
    <View className="">
      <Text className="text-center mb-3  font-bold">
        {`Your answer ${currentquestion}`}
      </Text>
      {data.map((item, index) => {
        return (
          <View>
            <View
            key={index}
            className="flex flex-row p-3 bg-gray-50 rounded-lg items-center gap-1
            ">
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

AnswerInputArea.propTypes = {
};
export default AnswerInputArea;