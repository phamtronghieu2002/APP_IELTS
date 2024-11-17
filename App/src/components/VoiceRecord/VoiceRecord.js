import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import { Audio } from "expo-av";

let recording = new Audio.Recording();

export default function VoiceRecord() {
  const [isLoading, setIsLoading] = React.useState(false);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const [count, setCount] = React.useState(90);

  React.useEffect(() => {
    let timer;

    if (count > 0) {
      timer = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer); // Cleanup interval on unmount or when isCounting changes
    };
  }, [count]);

  const countDownScreen = ({ count }) => {
    const formatTime = (totalSeconds) => {
      const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
      const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
        2,
        "0"
      );
      const seconds = String(totalSeconds % 60).padStart(2, "0");
      return `${hours}:${minutes}:${seconds}`;
    };
    return (
      <View className="flex flex-col items-center justify-center">
        <Text className="text-xl font-bold text-blue-500">
          {formatTime(count)}
        </Text>
      </View>
    );
  };

  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
      });

      await recording.prepareToRecordAsync( { android: { extension: '.mp3', outputFormat: 2, audioEncoder: 3, sampleRate: 44100, numberOfChannels: 2, bitRate: 128000 } } )
      await recording.startAsync();

    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  // hàm này sử lí upload file ghi âm lên server
  const uploadAudio = async (audioUri) => {
    if (!audioUri) {
   
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("audio", {
      uri: audioUri,
      name: `${new Date().getTime().toString()}.mp3`,
      type: "audio/mp3",
    });

    try {
      await delay(5000);
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/v1/gpt/upload/dinarycloud`,
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      ).then(setIsLoading(false));

      if (response.ok) {
        const data = await response.json();

      } else {
  
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  async function stopRecording() {
    console.log("Stopping recording..");
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    uploadAudio(uri);
  }
  return (
    <View style={styles.container}>
      {!isLoading ? (
        <View>
          {countDownScreen({ count })}
          <Button title="Start Recording" onPress={startRecording} />
          <Button title="Stop Recording" onPress={stopRecording} />
        </View>
      ) : (
        <View className="flex items-center">
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Save your voice...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 10,
  },
});
