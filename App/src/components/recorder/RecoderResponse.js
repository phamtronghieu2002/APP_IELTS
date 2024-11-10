import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
} from "react-native";
import {
  addAnwserToTestResult,
  deleteQuestionInTestResult,
  getTestResult,
} from "../../services/testResultServices";
import { _testTypes } from "../../utils/constant";
import DeleteButton from "../DeleteButton/DeleteButton";
import { AiVoiceTest } from "../../services/RatingVoice";
import AudioPlayer from "./AudioPlayer";

const RecoderResponse = ({ test_id, voice}) => {
  const [responseList, setResponseList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [expandedItems, setExpandedItems] = useState(
    Array(responseList.length).fill(false)
  );
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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
      const response = await AiVoiceTest({
        url: voice,
      });
      
 
      return response;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRatingVoice = async () => {
    if (voice) {
      try {
        const rating = await fetchRating();
        const newResponse = {
          question_id: new Date().getTime().toString(),
          rating: rating,
          url: voice,
        };
        setResponseList((prevList) => [...prevList, newResponse]);
        handleChooseAnswer(newResponse);
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
 
        const newResponses = data.anwsers.map((item) => ({
          question_id: item.question_id,
          rating: item.rating,
          url: item.url,
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

      fetchGetRating();
    } catch (error) {
      console.log("error >>>>", error);
    } finally {
      setIsDeleting(false);
    }
  };
  React.useEffect(() => {
    fetchGetRating();

  }, [test_id]);

  return (
    <View>
        {voice && (
          <Pressable
          onPress={handleRatingVoice}
          className="bg-red-300 rounded-full py-2 px-4 flex-row items-center justify-center active:bg-red-400"
          disabled={isLoading}
        >
            <Text className="text-white font-bold">Rating Voice</Text>
        </Pressable>
        )}
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
          <View>
            {expandedItems[index] ? (
              <View>
                <AudioPlayer url={item.url} />
                <View>
                <Text className="font-bold text-2lg text-red-500">
                    Warning: This is the rating of the AI system, not the real rating of the teacher !
                  </Text>
                  <Text className="font-bold text-lg text-red-500">
                    Rating your response :
                  </Text>
                  <Text className="font-bold italic">1. Tone on the voice recording</Text>
                  <Text>{item.rating.tone}</Text>
                </View>
                <View>
                  <Text className="font-bold italic">2. Grammar on the voice recording</Text>
                  <Text>{item.rating.Grammar}</Text>
                </View>
                <View>
                  <Text className="font-bold italic">
                    3. Pronunciation on the voice recording
                  </Text>
                  <Text>{item.rating.pronunciation}</Text>
                </View>
                <View>
                  <Text className="font-bold italic">4. Tempo on the voice recording</Text>
                  <Text>{item.rating.tempo}</Text>
                </View>
              </View>
            ) : (
              // Show a truncated version or just a summary here
              <Text>...</Text>
            )}
          </View>
          <TouchableOpacity onPress={() => toggleExpand(index)}>
            <Text className="text-blue-500">
              {expandedItems[index] ? "Show Less" : "Show More"}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default RecoderResponse;
