import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView, Pressable } from "react-native";
import * as Progress from "react-native-progress";
import HeaderScreen from "../Header/HeaderScreen";
import { getTestById } from "../../services/testService";
import { _testTypes } from "../../utils/constant";
import RadioButtonForm from "../RadioButton/RadioButtonForm";
import ActionBar from "../ActionBar/ActionBar";
import configs from '../../configs';
import AudioPlayer2 from "../recorder/AudioPlayer2";
import { useSelector } from "react-redux";


const VocabularyPlay = ({ navigation, route, headershow = true }) => {

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
  const testResults = route?.params?.testResults;

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
    setCountProgress(countProgress + 1);
  };

  React.useEffect(() => {
    fetchTestById();
  }, [test_id]);

  const testStore = useSelector((state) => state.test);
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const handlePlay = (index) => {
    setCurrentPlaying(index); // Cập nhật trạng thái đang phát
  };
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
                    console.log("item", item);
                    
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
                        <AudioPlayer2
                                    url={item.audio_url}
                                    isPlaying={currentPlaying === index}
                                    onPlay={() => handlePlay(index)}
                                    />
                        <RadioButtonForm
                        index={index}
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
            {showNextQuestion && <ActionBar
              navigation={navigation}
              classNames={"mb-0"}
              total_question={questions?.total_question}
              total_correct={
                answers?.filter((item) => item.is_correct)?.length
              }
              onPressNext={() => {
                handleNextQuestion();   
                setShowNextQuestion(false)
                if (currentQuestionIndex === questions?.questions?.length - 1) {
                  navigation?.navigate(configs?.screenName?.overview_vocabulary, { test_id: test_id, name_test: name_test, type:"Vocabulary", testResults: [testStore?.testResults]  });
                }
              }}
            />}
          </ScrollView>

      

        </>
      )}
    </SafeAreaView>
  );
};

export default VocabularyPlay;
