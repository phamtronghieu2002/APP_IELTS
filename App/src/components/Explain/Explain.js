import React from "react";
import PropTypes from "prop-types";
import RenderHtml from "react-native-render-html";
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
} from "react-native";
import IconA from "react-native-vector-icons/FontAwesome5";
import { useWindowDimensions } from "react-native";
const Explain = ({ is_correct, explain, anwser, type }) => {
  const { width } = useWindowDimensions();
  const icon = is_correct
    ? "https://res.cloudinary.com/dzpj1y0ww/image/upload/v1728032233/ielts/happy-face_1_r8nulh.png"
    : "https://res.cloudinary.com/dzpj1y0ww/image/upload/v1728032427/ielts/sad_1_gnhkwx.png";
  const colorText = is_correct ? "text-green-500" : "text-red-500";
  const colorIcon = is_correct ? "yellow" : "red";
  return (
    <View className="min-h-[100px] border border-gray-200 mt-3  rounded-lg  pl-3 flex-col justify-center pb-3 pt-3">
      {type === "writing" && (
        <View>
          <View className="">
            

            <Text className="text-blue-800 text-lg mb-2">Câu trả lời mẫu</Text>

            <RenderHtml
              contentWidth={width}
              source={{
                html: explain,
              }}
            />
          </View>
        </View>
      )}
      {type !== "writing" && (
        <View>
          <View className="flex flex-row items-center">
            <View className="w-10 flex justify-center  flex-row items-center">
              <Image
                style={{ width: 30, height: 30 }}
                source={{
                  uri: icon,
                }}
              />
            </View>
            <Text className={`ml-3 font-bold text-lg ${colorText} text-g`}>
              {is_correct ? "Correct" : "Incorrect"}
            </Text>
          </View>
          <View className="">
            <View className="flex flex-row gap-3 mb-1 items-center">
              <Text className="font-bold text-lg">Answers</Text>
              <Text className=""><RenderHtml
              contentWidth={width}
              source={{
                html: anwser,
              }}
            /></Text>
            </View>

            <Text className="text-blue-800 text-lg mb-2">Explain</Text>

            <RenderHtml
              contentWidth={width}
              source={{
                html: explain,
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

Explain.propTypes = {};
export default Explain;
