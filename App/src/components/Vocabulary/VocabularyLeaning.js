import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView, Image } from "react-native";
import HeaderScreen from "../Header/HeaderScreen";
import { getVocabularyByTestId } from "../../services/vocabularyService";
import AudioPlayer2 from "../recorder/AudioPlayer2";

const VocabularyLeaning = ({ navigation, route }) => {
  const test_id = route?.params?.test_id;

  const [Vocabulary, setVocabulary] = useState([]);
  const [currentPlaying, setCurrentPlaying] = useState(null); // Trạng thái theo dõi âm thanh nào đang phát

  const fetchVocabularyByTestId = async () => {
    try {
      const response = await getVocabularyByTestId(test_id);

      const data = response.data;
      setVocabulary(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVocabularyByTestId();
  }, [test_id]);

  const handlePlay = (index) => {
    setCurrentPlaying(index); // Cập nhật trạng thái đang phát
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderScreen label={route?.params?.nameTest} navigation={navigation} />
      <ScrollView className="px-4">
        <View>
          {Vocabulary?.map((item, index) => (
            <View
              key={index}
              className="flex-row justify-between items-center border-b-2 border-gray-300 py-4"
            >
              <View className="mr-4">
                <Text className="text-lg font-bold">{index + 1}</Text>
              </View>
              <View className="flex-1">
                <View className="flex-row items-center">
                  <Image
                    className="w-16 h-16 mr-3 rounded-lg"
                    source={{
                      uri: `${item.img_voc}`,
                    }}
                  />
                  <View className="flex-1">
                    <Text className="text-lg font-bold">{item.name_voc}</Text>
                    <Text className="text-gray-600">{item.pronun_voc}</Text>
                    <Text className="text-sm text-gray-500">{item.type_voc}</Text>
                  </View>
                </View>
                <Text className="text-gray-700 mt-2">Giải thích: {item.explain_voc}</Text>
                <Text className="text-gray-800 font-semibold mb-2">Ví dụ: {item.exm_voc}</Text>
                <AudioPlayer2
                  url={`${item.sound_voc}`}
                  isPlaying={currentPlaying === index} // Chỉ phát nếu trạng thái trùng
                  onPlay={() => handlePlay(index)} // Bắt sự kiện phát
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VocabularyLeaning;
