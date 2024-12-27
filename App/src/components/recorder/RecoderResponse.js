import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
  Image,
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
import Toast from "react-native-toast-message";

const RecoderResponse = ({ test_id, voice, topic }) => {
  const [responseList, setResponseList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [expandedItems, setExpandedItems] = useState(
    Array(responseList.length).fill(false)
  );
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const [reload, setReload] = useState(false); // New reload state
  console.log("responseList >>>>>>>>>", responseList);

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
      const response = await AiVoiceTest(
        topic,
        voice,

      );
      return response;
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Gemini Error !!!`",

      });
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
          rating: item?.rating?.[0] || (item?.rating ?? {}),
          url: item.url,
        }));
        setResponseList(newResponses); // Set the entire list at once
        setExpandedItems(Array(newResponses.length).fill(false)); // Reset expanded items
      })
      .catch((err) => {
        console.log("error >>>>", err);
      });
  };

  useEffect(() => {
    fetchGetRating();
  }, [reload]); // Trigger fetch on reload change

  const handleDelete = async (test_id, question_id) => {
    setIsDeleting(true);
    fetchGetRating();
    try {

      const fb = await deleteQuestionInTestResult(test_id, question_id);
      const data = fb.data;
      console.log("Status", data);
    } catch (error) {
      console.log("error >>>>", error);
    } finally {
      fetchGetRating();
      setReload((prev) => !prev); // Toggle reload state to trigger fetch
      setIsDeleting(false);
    }
  };

  return (
    <View className="">
      {voice && (
        <Pressable
          onPress={handleRatingVoice}
          className="bg-red-500 rounded-full py-2 px-4 flex-row items-center justify-center active:bg-red-400 mt-4"
          disabled={isLoading}
        >
          <Text className="text-white font-bold mr-4">Rating Voice Using AI</Text>
          <Image

            src="https://res.cloudinary.com/dzpj1y0ww/image/upload/v1733327560/chat-gpt_1_xws88j.png" alt="robot" className="w-6 h-6 " />

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
      <View className=" ">
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
                <View className="flex flex-col gap-5 mt-3">
                  <AudioPlayer url={item?.url} />
                  <View>
                    <Text className="font-bold text-2lg text-red-500">
                      Warning: This is the rating of the AI system, not the real rating of the teacher !
                    </Text>
                    <Text className="font-bold text-lg text-red-500 mt-3 mb-5">
                      Rating your response :
                    </Text>
                    <Text className="font-bold italic mb-2">1. Tone on the voice recording</Text>
                    <Text>{item.rating?.tone}</Text>
                  </View>
                  <View>
                    <Text className="font-bold italic mb-2">2. Grammar on the voice recording</Text>
                    <Text>{item.rating?.Grammar}</Text>
                  </View>
                  <View>
                    <Text className="font-bold italic mb-2">
                      3. Pronunciation on the voice recording
                    </Text>
                    <Text>{item.rating?.pronunciation}</Text>
                  </View>
                  <View>
                    <Text className="font-bold italic mb-2">4. Tempo on the voice recording</Text>
                    <Text>{item.rating?.tempo}</Text>
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
    </View>
  );
};

export default RecoderResponse;
