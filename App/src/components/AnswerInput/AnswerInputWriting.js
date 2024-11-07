import React, { useState } from "react";
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

const AnswerInputWriting = ({ test_id, data }) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [responseList, setResponseList] = useState([]);
  const [countWord, setCountWord] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [expandedItems, setExpandedItems] = useState(
    Array(responseList.length).fill(false)
  );

  const [count, setCount] = React.useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  React.useEffect(() => {
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
      newExpandedItems[index] = !newExpandedItems[index]; // Toggle the current index
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
      return response;
    } catch (error) {
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
          rating: rating,
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
      })
        .then((fb) => {
          const data = fb.data;
          console.log("data", data);
        })
        .catch((err) => {
          console.log("error >>>>", err);
        });
    } catch (error) {
      console.log("error >>>>", error);
    }
  };


  const fetchGetRating = async () => {
    getTestResult(test_id)
      .then((fb) => {
        const data = fb.data;
        console.log("data", data);
        const newResponses = data.anwsers.map((item) => ({
          question_id: item.question_id,
          time: item.time,
          countWord: item.countWord,
          userAnswer: item.userAnswer,
          rating: item.rating,
        }));
        setResponseList(newResponses); // Set the entire list at once
        setExpandedItems(Array(newResponses.length).fill(false)); // Reset expanded items
      })
      .catch((err) => {
        console.log("error >>>>", err);
      });
  };

  const handleDelete = async (test_id, question_id) => {
    setIsDeleting(true);
    try {
      await delay(5000);
      const fb = await deleteQuestionInTestResult(test_id, question_id);
      const data = fb.data;
      console.log("Status", data);
      fetchGetRating();
    } catch (error) {
      console.log("error >>>>", error);
    } finally {
      setIsDeleting(false);
    }
  };
  React.useEffect(() => {
    fetchGetRating();
  }, []);

  return (
    <View>
      <View className="flex border-2 border-gray-200 mb-3 rounded-xl">
        <View className="pl-1 pt-1 mb-3 bg-white">
          <View>
            <Text className="mt-1 font-bold">Your response</Text>
            <Text className="mt-1 text-gray-500 text-xs">
              Your words: {countWord}
            </Text>
          </View>
          <View>
            <Text>{formatTime(count)}</Text>
          </View>
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
          onFocus={() => setIsCounting(true)}
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
      {isDeleting && (
        <View className="flex items-center">
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Deleting Response...</Text>
        </View>
      )}
      {responseList.map((item, index) => (
        <View key={index} className="mt-3 p-2 border-t border-gray-300">
          <View className="flex flex-row justify-between items-center mt-1">
            <Text className="font-bold text-xl text-green-500">
              Response {index + 1}
            </Text>
            <DeleteButton
              handleDelete={() => handleDelete(test_id, item.question_id)}
            />
          </View>
          <Text className="font-bold italic mt-1">
            Time: {formatTime(item.time)}
          </Text>
          <Text className="font-bold italic mt-1">
            User Answer: {item.userAnswer}
          </Text>
          <Text className="font-bold italic mt-1">
            Word Count: {item.countWord}
          </Text>
          <Text className="font-bold italic text-red-800 mt-1 mb-2">
            Point: {item.rating.ielts_writing_score_rating}
          </Text>
          <View>
            {expandedItems[index] ? (
              <View>
                <View>
                  <Text className="font-bold text-lg text-red-500">
                    Rating your response :
                  </Text>
                  <Text className="font-bold italic">1. Grammar Errors</Text>
                  <Text>{item.rating.grammar_errors}</Text>
                </View>
                <View>
                  <Text className="font-bold italic">2. Vocabulary Errors</Text>
                  <Text>{item.rating.vocabulary_errors}</Text>
                </View>
                <View>
                  <Text className="font-bold italic">
                    3. Sentence Structure Errors
                  </Text>
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
                  <Text className="font-bold italic">
                    6. Detailed Solutions To Improve Writing
                  </Text>
                  <Text>
                    {item.rating.detailed_solutions_to_improve_writing}
                  </Text>
                </View>
              </View>
            ) : (
              // Show a truncated version or just a summary here
              <Text>{item.rating.grammar_errors.substring(0, 0)}...</Text>
            )}
          </View>
          <TouchableOpacity onPress={() => toggleExpand(index)}>
            <Text className="text-blue-500">
              {expandedItems[index] ? "Show Less" : "Show More"}
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

export default AnswerInputWriting;
