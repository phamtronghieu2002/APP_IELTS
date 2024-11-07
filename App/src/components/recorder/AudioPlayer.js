import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Slider, Text } from 'react-native';
import { Audio } from 'expo-av';

function AudioPlayer({ url }) {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  // Load and play the sound
  async function playPauseSound() {
    if (!sound) {
      const { sound } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: true }
      );
      setSound(sound);
      setIsPlaying(true);

      sound.setOnPlaybackStatusUpdate(updateStatus);
    } else {
      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    }
  }

  // Update progress status
  const updateStatus = (status) => {
    if (status.isLoaded) {
      setDuration(status.durationMillis || 0);
      setPosition(status.positionMillis || 0);
    }
    if (status.didJustFinish) {
      setIsPlaying(false);
      setPosition(0);
    }
  };

  // Seek the audio to a new position
  const handleSliderChange = async (value) => {
    if (sound) {
      await sound.setPositionAsync(value);
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Button title={isPlaying ? "Pause" : "Play"} onPress={playPauseSound} />
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onValueChange={handleSliderChange}
      />
      <Text style={styles.timeText}>
        {formatTime(position)} / {formatTime(duration)}
      </Text>
    </View>
  );
}

// Helper function to format milliseconds to mm:ss
const formatTime = (millis) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default function App() {
  return (
    <View style={styles.appContainer}>
      <AudioPlayer url="https://your-audio-url.com/Hello.mp3" />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  slider: {
    width: '80%',
    height: 40,
  },
  timeText: {
    marginTop: 10,
    fontSize: 16,
  },
});
