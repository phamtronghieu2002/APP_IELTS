import React from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import * as Progress from "react-native-progress";
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

const WritingTest = ({ navigation, route }) => {
  const { width } = useWindowDimensions();

  const [test, setTest] = React.useState({});

  const [questions, setQuestions] = React.useState({});
  const test_id = route?.params?.test_id;

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

  // Sử dụng useFocusEffect để gọi hàm fetch khi màn hình được focus
  useFocusEffect(
    React.useCallback(() => {
      fetchTestById();
    }, [test_id]) // Thêm test_id vào dependencies nếu cần
  );
  const [countProgress, setCountProgress] = React.useState(0);

  const handleProgressUpdate = () => {
    setCountProgress((prevCount) => prevCount + 1);
  };
  const [isShowExplain, setIsShowExplain] = React.useState(true);

  const [selectedValue, setSelectedValue] = React.useState(0);
  const options_SwitchSelector = [
    { label: "Your Response", value: 0 },
    { label: "Model Answer", value: 1 },
  ];

  return (
    <SafeAreaView>
      <HeaderScreen label={route?.params?.nameTest} navigation={navigation} />
      <View className="flex flex-row justify-center items-center pl-5 pr-5">
        <Text className="font-bold">
          {countProgress + "/" + questions.total_question}
        </Text>
        <Progress.Bar
          progress={countProgress / questions.total_question || 0}
          className="max-w-full ml-2"
          width={150}
          color="#FF0505"
        />
      </View>
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
          <View className="bg-gray-100 rounded-mg"
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
              paddingHorizontal: 3,
            }}
            className="bg-white shadow h-14 justify-center px-2.5 shadow-lg mb-3"
          >
            <SwitchSelector
              options={options_SwitchSelector}
              initial={0}
              onPress={(value) => setSelectedValue(value)}
              textColor={"#9F9F9F"} //'#7a44cf'
              selectedColor={"#F75656"}
              fontSize={16}
              buttonColor={"#f1f0f0"}
              borderColor={"#000000"}
            />
          </View>
          {selectedValue === 0 && (
             <View className="mb-5 border-b-2 border-gray-200 pb-3">
             <AnswerInputWriting
               data={questions?.questions?.[0]}
             />
           </View>
          )}
          {selectedValue === 1 && (
            <View className="mb-5 border-b-2 border-gray-200 pb-3">
              <ExpandableText text={questions?.questions?.[0].explain} type={"text"} name="Model"/>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default WritingTest;
