import React from "react";
import { View, Text, ScrollView, SafeAreaView, Pressable, TextInput } from "react-native";
import HeaderScreen from "../../Header/HeaderScreen";
import { getTestById } from "../../../services/testService";
import ExpandableText from "../../ExpandableText/ExpandableText";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import AnswerInputWriting from "../../AnswerInput/AnswerInputWriting";
import { _testTypes } from "../../../utils/constant";
import { useFocusEffect } from "@react-navigation/native";
import SwitchSelector from "react-native-switch-selector";
import ExpandableWriting from "../../ExpandableWriting/ExpandableWriting";
import Svg, { Circle } from 'react-native-svg';
import Button from "../../Button/Button";
import MainButton from "../../Button/MainButton";
import VoiceRecord from "../../VoiceRecord/VoiceRecord";
import DeleteButton from "../../DeleteButton/DeleteButton";

const WritingTest = ({ navigation, route }) => {
  const test_id = route?.params?.test_id;
  
  const { width } = useWindowDimensions();
  const [test, setTest] = React.useState({});
  const [questions, setQuestions] = React.useState({});
  const [count, setCount] = React.useState(15);
  const [phase, setPhase] = React.useState('down15'); // 'down15' -> 'up5' -> 'down5'
  const [showView, setShowView] = React.useState(false);


  React.useEffect(() => {
    let timer;

    if (phase === 'down15' && count > 0) {
      timer = setInterval(() => setCount((prevCount) => prevCount - 1), 1000);
    } else if (phase === 'down15' && count === 0) {
      clearInterval(timer);
      setPhase('down5');
      setCount(5);
    } else if (phase === 'down5' && count > 0) {
      timer = setInterval(() => setCount((prevCount) => prevCount - 1), 1000);
    } else if (phase === 'down5' && count === 0) {
      clearInterval(timer);
      setShowView(true);
    }

    return () => clearInterval(timer);
  }, [count, phase]);
  

  const fetchTestById = async () => {
    try {
      const response = await getTestById(test_id);
      const data = response.data;
      setTest(data);
      setQuestions(data.questions[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const startRecording = async() =>{
    try {

      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
      });
 
      const recording = new Audio.Recording({
        audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_QUALITY_HIGH,
        extension: ".mp3",
      });
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      setRecording(recording);

    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  const options_SwitchSelector = [
    { label: "Your Response", value: 0 },
    { label: "Model Answer", value: 1 },
  ];
  const countDownScreen = ({title, count}) => {
    const formatTime = (totalSeconds) => {
      const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
      const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
      const seconds = String(totalSeconds % 60).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    };
    return (
      <View className="flex flex-col items-center justify-center">
        <View style={{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
                className="rounded-lg w-[70%] h-[50%] items-center flex justify-center bg-white 
              shadow-2xl mb-5">
        <Text className="text-2xl font-bold text-blue-500">{formatTime(count)}</Text>
        </View>
        <Text className="text-blue-500">{title}</Text>
      </View>
    )
  }
const CountdownCircleTimer = ({title, count }) => {
  const radius = 50; 
  const strokeWidth = 10; 
  const circumference = 2 * Math.PI * radius; 

  const progress = (count / 5) * circumference;

  return (
    <View className='items-center justify-center'>
      <Svg height="120" width="120">
        <Circle
          stroke="#e6e6e6"
          fill="none"
          cx="60"
          cy="60"
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke="cyan"
          fill="none"
          cx="60"
          cy="60"
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference - progress}
          rotation="-90"
          origin="60, 60"
        />
      </Svg>
      <View className='absolute'>
        <Text className='text-2xl font-bold text-blue-500 pb-3'>{count}</Text>
      </View>
      <Text className="text-blue-500">{title}</Text>
    </View>
  );
};

  useFocusEffect(
    React.useCallback(() => {
      fetchTestById();
    }, [test_id])
  );
  return (
    <SafeAreaView>
      <HeaderScreen label={route?.params?.nameTest} navigation={navigation} />
      <ScrollView className="p-7">
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
          className="rounded-md bg-white p-5 mb-3"
        >
          <View className="flex flex-row bg-green-100 items-center justify-center">
            <Text className="font-bold bg-red-100">Question: </Text>
            <View className="flex-1 max-w-full max-h-40 overflow-hidden">
              <RenderHtml
                contentWidth={width}
                source={{ html: questions?.question_text }}
                // Thêm style cho RenderHtml
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%", // Giới hạn chiều rộng
                  overflow: "hidden", // Ẩn nội dung vượt quá
                }}
              />
            </View>
          </View>
          <View
            className="bg-gray-100 rounded-mg"
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
          >
            <ExpandableWriting text={questions?.questions?.[0].question_text} />
          </View>
        </View>
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
          className="rounded-md bg-white p-5 pb-32"
        >
           {showView ? (
        <View >
          <VoiceRecord />
        </View>
      ) : (
          <View>
            {phase === 'down15' ? countDownScreen({title:'Preparation Time', count: count }) : CountdownCircleTimer({ title:"Ready In",count: count })}
          </View>
      )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default WritingTest;
