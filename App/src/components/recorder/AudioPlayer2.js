import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";

const AudioPlayer2 = ({ url, isPlaying, onPlay }) => {
  const [sound, setSound] = useState(null);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [isPlayingState, setIsPlayingState] = useState(false);

  useEffect(() => {
    loadAudio();
    return () => {
      unloadAudio();
    };
  }, []);

  const loadAudio = async () => {
    setIsLoading(true);
    const { sound } = await Audio.Sound.createAsync(
      { uri: url },
      { shouldPlay: false }
    );
    sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    const status = await sound.getStatusAsync();
    setDuration(status.durationMillis || 0);
    setSound(sound);
    setIsLoading(false);
  };

  const unloadAudio = async () => {
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);
      if (status.didJustFinish) {
        setIsFinished(true);
      }
    }
  };

  const handlePlay = async () => {
    setIsPlayingState(true);
    if (!sound) return;
    await sound.playAsync();
    setIsFinished(false);
    onPlay();
  };

  const handlePause = async () => {
    setIsPlayingState(false);
    if (sound) {
      await sound.pauseAsync();
    }
  };

  const handleReplay = async () => {
    if (sound) {
      await sound.setPositionAsync(0);
      await sound.playAsync();
      setIsFinished(false);
      onPlay();
    }
  };

  const handleSliderChange = async (value) => {
    if (sound) {
      await sound.setPositionAsync(value);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.container}>
          {isFinished ? (
            <TouchableOpacity onPress={handleReplay}>
              <Ionicons name="refresh" size={30} color="#FF6B6B" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={isPlayingState ? handlePause : handlePlay}>
              <Ionicons name={isPlayingState ? "pause" : "play"} size={30} color="#FF6B6B" />
            </TouchableOpacity>
          )}
          <Text style={styles.timeText}>{formatTime(position)}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            onValueChange={handleSliderChange}
            minimumTrackTintColor="#FF6B6B"
            maximumTrackTintColor="#000000"
            thumbTintColor="#FF6B6B"
          />
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 15,
    marginTop: 15,
    justifyContent: "center",
  },
  timeText: {
    fontSize: 14,
    color: "#555",
    marginHorizontal: 5,
  },
  slider: {
    flex: 1,
  },
});

export default AudioPlayer2;
