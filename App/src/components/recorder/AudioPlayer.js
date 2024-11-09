import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons'; // For Play/Stop icon

const AudioPlayer = ({ url }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    loadSound();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [url]);

  const loadSound = async () => {
    try {
      setIsLoading(true);
      const { sound } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: false },
        onPlaybackStatusUpdate
      );
      setSound(sound);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to load sound", error);
      setIsLoading(false);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setProgress(status.positionMillis / status.durationMillis);
      setIsPlaying(status.isPlaying);
    }
  };

  const togglePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
    }
  };

  return (
    <View
      style={{
        alignItems: 'center',
        margin: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        elevation: 5,
        width: '90%',
      }}
    >
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={togglePlayPause}
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: isPlaying ? 'red' : 'blue',
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 5,
              }}
            >
              <Ionicons
                name={isPlaying ? 'stop' : 'play'}
                size={30}
                color="#fff"
              />
            </TouchableOpacity>
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={0}
              maximumValue={1}
              value={progress}
              onValueChange={(value) => {
                if (sound) {
                  sound.setPositionAsync(value * sound._durationMillis);
                }
              }}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default AudioPlayer;
