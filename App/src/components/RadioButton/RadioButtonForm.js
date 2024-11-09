import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Bạn có thể chọn FontAwesome, MaterialIcons...
import RadioButton from "../RadioButton/RadioButton";
import { getTestById, updateIsDoing } from "../../services/testService";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import { _testTypes } from "../../utils/constant";
import {
  addAnwserToTestResult,
  addTestResult,
} from "../../services/testResultServices";
import Explain from "../Explain/Explain";
import { useDispatch, useSelector } from "react-redux";
import { setTestStore } from "../../fetures/testSlice";

const RadioButtonForm = ({
  item,
  onProgressUpdate,
  handelShowChoiceNextQuestion,
  onHandleSetAnswers,
  ...props
}) => {
  const [answers, setAnswers] = React.useState([]);
  const { test_id, test } = props;
  const { width } = useWindowDimensions();


  // hieu viet
  const testStore = useSelector((state) => state.test);
  const dispatch = useDispatch();


  const handleChooseAnswer = async (question_id, options) => {
    try {
      const is_doing = test?.is_doing;
      if (!is_doing) {
        await updateIsDoing(test_id, {
          is_doing: true,
        });
      }

      setAnswers((prev) => {
        const isExits = prev.some((a) => a.question_id === question_id);
        if (isExits) {
          return prev;
        } else {

          const data = {
            question_id,
            is_correct: options.is_correct,
          }
          onHandleSetAnswers(data);

          addAnwserToTestResult(test_id, _testTypes?.new, {
            anwser: data,
          })
            .then((fb) => {
              const data = fb.data;
          
              dispatch(setTestStore({ testResults: data }));
            })
            .catch((err) => {
              console.log("error >>>>", err);
            });
          onProgressUpdate();
          handelShowChoiceNextQuestion();
          return [
            ...prev,
            {
              question_id,
              options,
            },
          ];
        }
      });
    } catch (error) {
      console.log("error >>>>", error);
    }
  };
  return (
    <View>
      <View className="">
        {/* <Text className="font-bold text-lg">{`questions ${countQuestion}-${countlastQuestion}`}</Text>
        <Text className="mb-10">{description}</Text> */}
        <RenderHtml
          contentWidth={width}
          source={{
            html: item.question_text,
          }}
        />
        {item.options.map((a, index) => {
          return (
            <View
              key={index}
              className="mb-1">
              <RadioButton

                isShowAnswer={answers?.some(
                  (ans) =>
                    ans.question_id === item.question_id
                )}
                is_correct={a.is_correct}
                incorrectAnswerId={
                  answers?.find(
                    (ans) =>
                      ans.question_id === item.question_id
                  )?.options?.option_id
                }
                optionId={a.option_id}
                onPress={() =>
                  handleChooseAnswer(item.question_id, a)
                }
                key={index}
                label={a.text}
              />
            </View>
          );
        })}
        {answers?.some(
          (a) => a.question_id === item.question_id
        ) && (
            <Explain
              is_correct={
                answers.find(
                  (a) => a.question_id === item.question_id
                ).options.is_correct
              }
              explain={item.explain}
              anwser={
                item.options.find((a) => a.is_correct)?.text
              }
              type="normal"
            />
          )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default RadioButtonForm;
