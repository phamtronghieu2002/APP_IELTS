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
import { useDispatch } from 'react-redux';
import { setTestStore } from '../../fetures/testSlice';

const AnswerInputArea = ({
  data, ...props
}) => {
  const { test_id, is_doing } = props;
  const { is_correct, explain, anwser, isShow, currentquestion, onProgressUpdate, handelShowNextQuestion, parrent_question } = props;


  const [userAnswer, setUserAnswer] = React.useState([]);
  const [isClickCheck, setIsClickCheck] = useState(false);
  const [showExplain, setShowExplain] = useState(isShow);
  const dispatch = useDispatch();
  const checkAnswer = async () => {
    let testResult = new Map();
    data.map((item, index) => {
      if (item.is_correct?.toLowerCase() === userAnswer[index]?.toLowerCase()) {
        testResult.set(item.option_id, true); // Use set to add key-value pairs

      } else {
        testResult.set(item.option_id, false); // Use set to add key-value pairs


      }
      onProgressUpdate()
    });


    const testResultArray = Array.from(testResult, ([question_id, is_correct]) => ({ question_id, is_correct, parrent_question_id: parrent_question?.question_id }));

    testResultArray.forEach(async (item) => {
      try {
        const res = await addAnwserToTestResult(test_id, _testTypes?.new, {
          anwser: item
        });
        console.log('====================================');
        console.log("res chưa nhận được >>>>>>", res);
        console.log('====================================');
        const data = res.data;
        dispatch(setTestStore({ testResults: data }));
      } catch (error) {
        console.error(error);
      }
    }
    );
    setIsClickCheck(true);
    setShowExplain(true);
    handelShowNextQuestion();
  };

  const checkiscorrect = (anwser, index) => {
    if (anwser?.toLowerCase() === userAnswer[index]?.toLowerCase()) {
      return true;
    }
    return false;
  }
  const handelShowExplain = ({ item, index }) => {
    return (
      <View
        className="mb-3">
        <Explain
          is_correct={checkiscorrect(item.is_correct, index)}
          explain={item.explain}
          anwser={item.is_correct}
          type="normal"
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
          <View
            key={index}
          >
            <View

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
              isClickCheck && showExplain && handelShowExplain({ is_correct, item, anwser, index })
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