import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Pressable,
} from "react-native";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AudioPlayer} from 'react-native-simple-audio-player';

const AudioPlayerUI = () => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [isRepeating, setIsRepeating] = useState(false);
  const [volume, setVolume] = useState(1); // Volume range from 0 to 1
  const intervalRef = useRef(null);

  async function loadSound() {
    const { sound } = await Audio.Sound.createAsync(
      { uri: "https://webaudioapi.com/samples/audio-tag/chrono.mp3" },
      { shouldPlay: false }
    );
    sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    setSound(sound);
  }

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setDuration(status.durationMillis || 0);
      setPosition(status.positionMillis || 0);
      setIsPlaying(status.isPlaying);

      // Check if the audio has ended and is in repeat mode
      if (status.didJustFinish && isRepeating) {
        playSound();
      }
    }
  };

  const playSound = async () => {
    if (sound) {
      await sound.playAsync();
      startPositionLogger();
    }
  };

  const pauseSound = async () => {
    if (sound) {
      await sound.pauseAsync();
      stopPositionLogger();
    }
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      stopPositionLogger();
      setPosition(0); // Reset position to start
    }
  };

  const startPositionLogger = () => {
    stopPositionLogger();
    intervalRef.current = setInterval(async () => {
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        setPosition(status.positionMillis);
      }
    }, 1000);
  };

  const stopPositionLogger = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleSliderChange = async (value) => {
    if (sound) {
      await sound.setPositionAsync(value);
      setPosition(value);
    }
  };

  const handleVolumeChange = async (value) => {
    if (sound) {
      await sound.setVolumeAsync(value);
      setVolume(value);
    }
  };

  useEffect(() => {
    loadSound();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
      stopPositionLogger();
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        // Stop sound when screen loses focus
        stopSound();
      };
    }, [sound])
  );

  const formatTime = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <View className="pt-6 bg-gray-500 item-center">
      <AudioPlayer
        url={'https://webaudioapi.com/samples/audio-tag/chrono.mp3'}
      />
    </View>
  );
};

export default AudioPlayerUI;
