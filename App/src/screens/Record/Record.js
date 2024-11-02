



import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";

import { useState } from "react";
import { Button, ScrollView, View, Text } from "react-native";
import MainLayout from "../../layouts/MainLayout";
import HeaderScreen from "../../components/Header/HeaderScreen";
function Record({navigation}) {
  const [recognizing, setRecognizing] = useState(false);
  const [transcript, setTranscript] = useState("");

  useSpeechRecognitionEvent("start", () => setRecognizing(true));
  useSpeechRecognitionEvent("end", () => setRecognizing(false));
  useSpeechRecognitionEvent("result", (event) => {
    setTranscript(event.results[0]?.transcript);
  });
  useSpeechRecognitionEvent("error", (event) => {
    console.log("error code:", event.error, "error messsage:", event.message);
  });

  const handleStart = async () => {
    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!result.granted) {
      console.warn("Permissions not granted", result);
      return;
    }

    console.log("transcript", transcript);
    
    // Start speech recognition
    ExpoSpeechRecognitionModule.start({
      recordingOptions:{
        persist: true
      },
      lang: "vi-VN",
      interimResults: true,
      maxAlternatives: 1,
      continuous: false,
      requiresOnDeviceRecognition: false,
      addsPunctuation: false,
      contextualStrings: ["Carlsen", "Nepomniachtchi", "Praggnanandhaa"],
    });
  };

  return (
    <MainLayout>
      <HeaderScreen title="Record" 
      navigation={navigation}
      />
      <View className="pt-4">
        {!recognizing ? (
          <Button title="Start" onPress={handleStart} />
        ) : (
          <Button title="Stop" onPress={ExpoSpeechRecognitionModule.stop} />
        )}

        <ScrollView>
          <Text className="">
            xin chao
          </Text>
          <Text>{transcript}</Text>
        </ScrollView> 


      </View>
    </MainLayout>
  );
}

export default Record;




