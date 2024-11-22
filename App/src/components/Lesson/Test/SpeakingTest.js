import React from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet} from "react-native";
import HeaderScreen from "../../Header/HeaderScreen";
import { getTestById } from "../../../services/testService";
import ExpandableText from "../../ExpandableText/ExpandableText";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import { _testTypes } from "../../../utils/constant";
import { useFocusEffect } from "@react-navigation/native";
import SwitchSelector from "react-native-switch-selector";
import ExpandableWriting from "../../ExpandableWriting/ExpandableWriting";
import Recorder from "../../recorder/Recorder";
import RecoderResponse from "../../recorder/RecoderResponse";
import ActionBar from "../../ActionBar/ActionBar";

const SpeakingTest = ({ navigation, route, dataStasitic, headershow = true, onNextPart, part, isFinish }) => {

  const { width } = useWindowDimensions();

  const [test, setTest] = React.useState({});

  const [voice, setVoice] = React.useState();

  const [questions, setQuestions] = React.useState({});
  const test_id = route?.params?.test_id || dataStasitic?.test_id;

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
    }, [part,test_id]) // Thêm test_id vào dependencies nếu cần
  );

  const [selectedValue, setSelectedValue] = React.useState(0);
  const options_SwitchSelector = [
    { label: "Your Response", value: 0 },
    { label: "Model Answer", value: 1 },
  ];

  return (
    <SafeAreaView>{
      headershow ? <HeaderScreen label={route?.params?.nameTest} navigation={navigation} /> : <></>
      }

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
          <View style={styles.container}>
      <Text style={styles.partText}>Part 1</Text>
      <Text style={styles.directions}>
        Directions: You will have <Text style={styles.highlight}>15 seconds</Text> to prepare and{' '}
        <Text style={styles.highlight}>60 seconds</Text> to respond to each question.
      </Text>
      <View style={styles.questionContainer}>
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
              <Recorder setVoice={setVoice} />
              <View>
                <RecoderResponse voice={voice} test_id={test_id} />
              </View>
            </View>
          )}
          {selectedValue === 1 && (
            <View className="mb-5 border-b-2 border-gray-200 pb-3">
              <ExpandableText text={questions?.questions?.[0].explain} type={"text"} name="Model" />
            </View>
          )}
        </View>
      </ScrollView>
      {
        1 ? <ActionBar
          navigation={navigation}
          classNames={"mb-0 mt-3"}
          total_question={1}
          total_correct={
            1
          }
          onPressNext={() => {
            onNextPart();
          }

          }
        /> :<></>
      }
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 3, // Shadow effect for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  partText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  directions: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#000',
  },
  questionContainer: {
    padding: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  questionText: {
    fontSize: 14,
    color: '#333',
  },
});
export default SpeakingTest;
