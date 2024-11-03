import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import MainButton from "../Button/MainButton";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import { AiWritingTest } from "../../services/RatingWriting";

const ResponseVoice = ({ userAnswer ,data }) => {
  const { width } = useWindowDimensions();
  const [responseList, setResponseList] = useState([]);
  const [countWord, setCountWord] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedItems, setExpandedItems] = useState(
    Array(responseList.length).fill(false) // Initialize with false for all items
  );

  // Toggle function for expanding/collapsing an item
  const toggleExpand = (index) => {
    setExpandedItems((prev) => {
      const newExpandedItems = [...prev];
      newExpandedItems[index] = !newExpandedItems[index]; // Toggle the current index
      return newExpandedItems;
    });
  };

  const fetchRating = async () => {
    setIsLoading(true); 
    try {
      console.log("data.question_text", data.question_text);
      console.log("userAnswer", userAnswer);
      const response = await AiWritingTest({ text: userAnswer, topic: data.question_text });
      return response;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); 
    }
  };

  const handleRatingAnswer = async () => {
    if (userAnswer) {
      try {
        const rating = await fetchRating();
        const newResponse = {
          countWord: countWord,
          userAnswer: userAnswer,
          rating: rating,
        };
        setResponseList((prevList) => [...prevList, newResponse]);
        setUserAnswer("");
        setCountWord(0);
      } catch (error) {
        console.error("Error fetching rating:", error);
      }
    }
  };

  return (
    <View>
      <View className="flex border-2 border-gray-200 mb-3 rounded-xl">
        <View className="pl-1 pt-1 mb-3 bg-white">
          <Text className="mt-1 font-bold">Your response</Text>
          <Text className="mt-1 text-gray-500 text-xs">
            Your words: {countWord}
          </Text>
        </View>
        <TextInput
          multiline={true}
          numberOfLines={4}
          className="text-lg pl-4 pt-1 bg-gray-50 max-w-full mr-2 ml-2 mb-2 border border-gray-300 shadow-lg rounded-lg"
          placeholder="Type your answer....."
          onChangeText={(text) => {
            const words = text.trim().split(/\s+/);
            setCountWord(words.filter(Boolean).length);
            setUserAnswer(text);
          }}
          value={userAnswer}
        />
      </View>
      
      {/* Hiển thị Loading */}
      {isLoading && (
        <View className="flex items-center">
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading rating...</Text>
        </View>
      )}

      {responseList.map((item, index) => (
        <View key={index} className="mt-3 p-2 border-t border-gray-300">
          <Text className="font-bold text-xl text-green-500">Response {index + 1}</Text>
          <Text className="font-bold italic mt-1">User Answer: {item.userAnswer}</Text>
          <Text className="font-bold italic mt-1">Word Count: {item.countWord}</Text>
          <Text className="font-bold italic text-red-800 mt-1 mb-2">Point: {item.rating.ielts_writing_score_rating}</Text>
          <View>
            {expandedItems[index] ? (
              <View>
                  <View>
                    <Text className="font-bold text-lg text-red-500">Rating your response :</Text>
                    <Text className="font-bold italic">1. Grammar Errors</Text>
                    <Text>{item.rating.grammar_errors}</Text>
                  </View>
                  <View>
                    <Text className="font-bold italic">2. Vocabulary Errors</Text>
                    <Text>{item.rating.vocabulary_errors}</Text>
                  </View>
                  <View>
                    <Text className="font-bold italic">3. Sentence Structure Errors</Text>
                    <Text>{item.rating.sentence_structure_errors}</Text>
                  </View>
                  <View>
                    <Text className="font-bold italic">4. Coherence Errors</Text>
                    <Text>{item.rating.coherence_errors}</Text>
                  </View>
                  <View>
                    <Text className="font-bold italic">5. Cohesion Errors</Text>
                    <Text>{item.rating.cohesion_errors}</Text>
                  </View>
                  <View>
                    <Text className="font-bold italic">6. Detailed Solutions To Improve Writing</Text>
                    <Text>{item.rating.detailed_solutions_to_improve_writing}</Text>
                  </View>
              </View>
            ) : (
              // Show a truncated version or just a summary here
              <Text>{item.rating.grammar_errors.substring(0, 0)}...</Text>
            )}
          </View>
          <TouchableOpacity onPress={() => toggleExpand(index)}>
            <Text className="text-blue-500">
              {expandedItems[index] ? 'Show Less' : 'Show More'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
      
      <MainButton
        title={"Rate my answer"}
        roundedfull
        onPress={handleRatingAnswer}
      />
    </View>
  );
};

export default ResponseVoice;
