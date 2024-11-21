import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import MainButton from "../Button/MainButton";
import { AiWritingTest } from "../../services/RatingWriting";
import {
  addAnwserToTestResult,
  deleteQuestionInTestResult,
  getTestResult,
} from "../../services/testResultServices";
import { _testTypes } from "../../utils/constant";
import DeleteButton from "../DeleteButton/DeleteButton";
import Toast from "react-native-toast-message";

const AnswerInputWriting = ({ test_id, data }) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [responseList, setResponseList] = useState([]);
  const [countWord, setCountWord] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);
  const [reload, setReload] = useState(false); // New reload state

  const [count, setCount] = useState(0);
  const [isCounting, setIsCounting] = useState(false);


  console.log("responseList >>>>", responseList[0]?.rating);


    
  useEffect(() => {
    let interval;
    if (isCounting) {
      interval = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCounting]);


  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [
      hrs.toString().padStart(2, "0"),
      mins.toString().padStart(2, "0"),
      secs.toString().padStart(2, "0"),
    ].join(":");
  };

  const toggleExpand = (index) => {
    setExpandedItems((prev) => {
      const newExpandedItems = [...prev];
      newExpandedItems[index] = !newExpandedItems[index];
      return newExpandedItems;
    });
  };

  const fetchRating = async () => {
    setIsLoading(true);
    try {
      const response = await AiWritingTest({
        text: userAnswer,
        topic: data.question_text,
      });
      console.log("Rating response >>>>>>", response);

      return response;
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Gemini Error !!!`",

      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRatingAnswer = async () => {
    setIsCounting(false);
    if (userAnswer) {
      try {
        const rating = await fetchRating();
        const newResponse = {
          question_id: new Date().getTime().toString(),
          time: count,
          countWord: countWord,
          userAnswer: userAnswer,
          rating: rating?.[0] ?? {},
        };
        setResponseList((prevList) => [...prevList, newResponse]);
        handleChooseAnswer(newResponse);
        setUserAnswer("");
        setCountWord(0);
        setCount(0);
      } catch (error) {
        console.error("Error fetching rating:", error);
      }
    }
  };

  const handleChooseAnswer = async (newResponse) => {
    try {
      await addAnwserToTestResult(test_id, _testTypes?.new, {
        anwser: newResponse,
      });
    } catch (error) {
      console.log("error >>>>", error);
    }
  };

  const fetchGetRating = async () => {
    try {
      const fb = await getTestResult(test_id);
      const data = fb.data;
      const newResponses = data.anwsers.map((item) => ({
        question_id: item.question_id,
        time: item.time,
        countWord: item.countWord,
        userAnswer: item.userAnswer,
        rating: item?.rating?.[0] ?? {},
      }));
      setResponseList(newResponses);
      setExpandedItems(Array(newResponses.length).fill(false));
    } catch (err) {
      console.log("error >>>>", err);
    }
  };



  useEffect(() => {
    fetchGetRating();
  }, [reload]); // Trigger fetch on reload change

  const handleDelete = async (test_id, question_id) => {

    try {

      setIsDeleting(true);
      await deleteQuestionInTestResult(test_id, question_id);
    } catch (error) {
      console.log("error >>>>", error);
    } finally {

      fetchGetRating();
      setIsDeleting(false);
    }
  };

  return (
    <View>
      <View className="flex border-2 border-gray-200 mb-3 rounded-xl">
        <View className="pl-1 pt-1 mb-3 bg-white">
          <Text className="mt-1 font-bold">Your response</Text>
          <Text className="mt-1 text-gray-500 text-xs">Your words: {countWord}</Text>
          <Text>{formatTime(count)}</Text>
        </View>
        <TextInput
          multiline
          numberOfLines={4}
          className="text-lg pl-4 pt-1 bg-gray-50 max-w-full mr-2 ml-2 mb-2 border border-gray-300 shadow-lg rounded-lg"
          placeholder="Type your answer..."
          onChangeText={(text) => {
            const words = text.trim().split(/\s+/);
            setCountWord(words.filter(Boolean).length);
            setUserAnswer(text);
          }}
          onFocus={() => setIsCounting(true)}
          value={userAnswer}
        />
      </View>

      {isLoading && (
        <View className="flex items-center">
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading rating...</Text>
        </View>
      )}
      {isDeleting && (
        <View className="flex items-center">
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Deleting Response...</Text>
        </View>
      )}

      {responseList?.map((item, index) => (


        item?.rating ? <View key={index} className="mt-3 p-2 border-t border-gray-300">
          <View className="flex flex-row justify-between items-center mt-1">
            <View className="pr-2">
              <Text className="font-bold text-xl text-green-500">Response {index + 1}</Text>
              <Text className="font-bold text-4lg text-red-500">
                Warning: This is the rating of the AI system, not the real rating of the teacher !
              </Text>
            </View>

            <DeleteButton handleDelete={() => handleDelete(test_id, item.question_id)} />
          </View>
          <Text className="font-bold italic mt-1">Time: {formatTime(item.time)}</Text>
          <Text className="font-bold italic mt-1">User Answer: {item.userAnswer}</Text>
          <Text className="font-bold italic mt-1">Word Count: {item.countWord}</Text>
          <Text className="font-bold italic text-red-800 mt-1 mb-2">
            Point: {item.rating?.ielts_writing_score_rating}
          </Text>
          <View>
            {expandedItems[index] ? (
              <View>
                <Text className="font-bold text-lg text-red-500">Rating your response:</Text>
                <Text className="font-bold italic">1. Grammar Errors</Text>
                <Text>{item.rating?.grammar_errors}</Text>
                <Text className="font-bold italic">2. Vocabulary Errors</Text>
                <Text>{item.rating?.vocabulary_errors}</Text>
                <Text className="font-bold italic">3. Sentence Structure Errors</Text>
                <Text>{item.rating?.sentence_structure_errors}</Text>
                <Text className="font-bold italic">4. Coherence Errors</Text>
                <Text>{item.rating?.coherence_errors}</Text>
                <Text className="font-bold italic">5. Cohesion Errors</Text>
                <Text>{item.rating?.cohesion_errors}</Text>
                <Text className="font-bold italic">6. Solutions To Improve Writing</Text>
                <Text>{item.rating?.detailed_solutions_to_improve_writing}</Text>
              </View>
            ) : (
              <Text>...</Text>
            )}
          </View>
          <TouchableOpacity onPress={() => toggleExpand(index)}>
            <Text className="text-blue-500">
              {expandedItems[index] ? "Show Less" : "Show More"}
            </Text>
          </TouchableOpacity>
        </View> : null
      ))}

      <MainButton title="Rate my answer" roundedfull onPress={handleRatingAnswer} />
    </View>
  );
};

export default AnswerInputWriting;
