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
import { _testTypes } from '../../utils/constant';
import AnswerInputArea from './AnswerInput';

const AnswerInputForm = ({
    
}) => {


  return (
    <View className="">
       <AnswerInputArea
        data={questions?.questions?.[2].options}
        test_id={test_id}
        is_doing={test?.is_doing}
        is_correct={
          answers.find(
            (a) =>
              a.question_id ===
              questions?.questions?.[2].question_id
          )?.options.is_correct
        }
        explain={questions?.questions?.[2].explain}
        anwser={
          questions?.questions?.[2].options.find(
            (a) => a.is_correct
          )?.text
        }
        isShow={isShowExplain}
      />
      </View>
  );
};

export default AnswerInputForm;