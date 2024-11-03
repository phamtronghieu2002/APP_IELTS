import * as React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { Audio } from "expo-av";

export default function VoiceRecord() {
  const [recording, setRecording] = React.useState();
  const [audioUri, setAudioUri] = React.useState(null); // Để lưu URI của file ghi âm

  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
      });
      console.log("Starting recording..");
      const recording = new Audio.Recording({
        audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_QUALITY_HIGH,
        extension: ".mp3",
      });
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setAudioUri(uri); // Lưu URI của file ghi âm để upload sau
    console.log("Recording stopped and stored at", uri);
  }

  async function uploadAudio() {
    if (!audioUri) {
      console.log("No audio file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("audio", {
      uri: audioUri,
      name: "recording.mp3",
      type: "audio/mp3",
    });

    try {
      const response = await fetch("http://192.168.85.187:8080/api/v1/audio/uploadMobile", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Upload successful:", data);
      } else {
        console.log("Upload failed:", response);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  return (
    <View style={styles.container}>
      <Button
        title={recording ? "Stop Recording" : "Start Recording"}
        onPress={recording ? stopRecording : startRecording}
      />
      {audioUri && (
        <Button title="Upload Recording" onPress={uploadAudio} />
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
