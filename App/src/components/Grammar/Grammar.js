import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView, Pressable } from "react-native";
import * as Progress from "react-native-progress";
import HeaderScreen from "../Header/HeaderScreen";
import { getTestById } from "../../services/testService";
import { _testTypes } from "../../utils/constant";
import RadioButtonForm from "../RadioButton/RadioButtonForm";
import ActionBar from "../ActionBar/ActionBar";

const Grammar = ({ navigation, route, headershow = true }) => {

  const [countProgress, setCountProgress] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = React.useState({});
  const type = route?.params?.type;
  const [showNextQuestion, setShowNextQuestion] = React.useState(false);

  const test_id = route?.params?.test_id;
  const refresh = route?.params?.cb;
  const name_test = route?.params?.nameTest;
  
  const [test, setTest] = React.useState({});

  const [loading, setLoading] = useState(false);

  const fetchTestById = async () => {
    try {
      setLoading(true);
      const response = await getTestById(test_id);
      const data = response.data;
      setLoading(false);
      setTest(data);
      
      setQuestions(data.questions[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions?.questions?.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCountProgress(countProgress + 1); // Cập nhật progress
    }
  };
  
  const [answers, setAnswers] = React.useState([]);



  const handleSetAnswers = (answer) => {
    if (answer?.length) {
      setAnswers(answer);
      return;
    }
    setAnswers([...answers, answer])
  };

  const handleProgressUpdate = () => {
    console.log("handleProgressUpdate");
  };

  React.useEffect(() => {
    fetchTestById();
  }, [test_id]);
console.log("choiceQuestions", questions?.questions);
  return (
    <SafeAreaView className="flex-1">
      {headershow && (
        <HeaderScreen
          onPress={refresh}
          label={name_test}
          navigation={navigation}
        />
      )}

      {!loading && (
        <>
          <View className="flex flex-row justify-center items-center pl-5 pr-5">
            <Text className="font-bold mr-3 text-red-600">
              {countProgress + "/" + questions?.questions?.length}
            </Text>
            <Progress.Bar
              style={{
                backgroundColor: "white",
                borderColor: "white",
              }}
              progress={countProgress / questions?.questions?.length || 0}
              color="red"
              width={300}
              height={10}
              borderRadius={15}
            />
          </View>

          <ScrollView>
            <View className="container p-7 pb-10">
              { questions?.questions?.map((item, index) => {
                  if (index === currentQuestionIndex) {
                    return (
                      <View key={index}>
                        <View
                          style={{
                            shadowColor: "#000",
                            shadowOffset: {
                              width: 0,
                              height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                          }}
                          className="rounded-md bg-white p-5 pb-1"
                        >
                          <RadioButtonForm
                        item={item}
                        test_id={test_id}
                        test={test}
                        onProgressUpdate={handleProgressUpdate}
                        onHandleSetAnswers={handleSetAnswers}
                        handelShowChoiceNextQuestion={() => setShowNextQuestion(true)}
                      />
                        </View>
                      </View>
                    );
                  }
                })}
            </View>
            <View className="h-20"></View>
          </ScrollView>

          {showNextQuestion && <ActionBar
              navigation={navigation}
              classNames={"mb-0"}
              total_question={answers?.length}
              total_correct={
                answers?.filter((item) => item.is_correct)?.length
              }
              onPressNext={() => {
                handleNextQuestion();   
                setShowNextQuestion(false) 
              }}
            />}

        </>
      )}
    </SafeAreaView>
  );
};

export default Grammar;
