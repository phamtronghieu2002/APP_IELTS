import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import { FontAwesome } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect

export default function AudioPlayerUI({
  audio_url
}) {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [speed, setSpeed] = useState(1.0);
  const [volume, setVolume] = useState(1.0);
       


  

  
  async function loadSound() {
    const audio_path = `${process.env.EXPO_PUBLIC_API_URL}/files/${audio_url}`;
    const { sound } = await Audio.Sound.createAsync(
      { uri: audio_path },
      { shouldPlay: false, rate: speed, volume }
    );

    
    setSound(sound);
    setIsPlaying(true);

    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded) {
        setDuration(status.durationMillis);
        setPosition(status.positionMillis);
        setIsPlaying(status.isPlaying);
      }
    });
  }

  async function togglePlayPause() {
    if (!sound) return;
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  }

  async function skipForward() {
    if (sound) {
      const newPosition = Math.min(position + 10000, duration);
      await sound.setPositionAsync(newPosition);
    }
  }

  async function skipBackward() {
    if (sound) {
      const newPosition = Math.max(position - 10000, 0);
      await sound.setPositionAsync(newPosition);
    }
  }

  async function replay() {
    if (sound) {
      await sound.setPositionAsync(0);
      await sound.playAsync();
    }
  }

  async function changeSpeed(newSpeed) {
    if (sound) {
      await sound.setRateAsync(newSpeed, true);
      setSpeed(newSpeed);
    }
  }

  async function changeVolume(newVolume) {
    if (sound) {
      await sound.setVolumeAsync(newVolume);
      setVolume(newVolume);
    }
  }

  useEffect(() => {
    loadSound();
    return sound ? () => sound.unloadAsync() : undefined;
  }, [audio_url]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (sound) {
          sound.stopAsync(); // Dừng âm thanh khi rời khỏi màn hình
        }
      };
    }, [sound])
  );

  return (
    <View style={styles.container}>
   

      <View className="">
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          minimumTrackTintColor="#FF0000" // Phần đã phát là màu đỏ (giống YouTube)
          maximumTrackTintColor="#D3D3D3" // Phần chưa phát là màu xám nhạt
          thumbTintColor="#6C63FF" // Nút điều chỉnh màu trắng
          thumbStyle={styles.thumb} // Tùy chỉnh kích thước nút
          trackStyle={styles.track} // Tùy chỉnh chiều cao của thanh
          trackThickness={500}
          thumbSize={150}
          onSlidingComplete={async (value) => {
            if (sound) {
              await sound.setPositionAsync(value);
            }
          }}
        />

        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{Math.floor(position / 1000)}s</Text>
          <Text style={styles.timeText}>/</Text>
          <Text style={styles.timeText}>{Math.floor(duration / 1000)}s</Text>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity onPress={skipBackward}>
            <FontAwesome
              name="backward"
              size={24}
              color="#6C63FF"
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity
          className="flex items-center justify-center bg-red-500 "
          onPress={togglePlayPause}>
            <FontAwesome
              name={isPlaying ? "pause-circle" : "play-circle"}
              size={48}
              color="#6C63FF"
              style={styles.playIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={skipForward}>
            <FontAwesome
              name="forward"
              size={24}
              color="#6C63FF"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.speedContainer}>
          <Text style={styles.speedLabel}>Tốc độ:</Text>
          {[1.0, 1.5, 2.0, 3.0].map((rate) => (
            <TouchableOpacity key={rate} onPress={() => changeSpeed(rate)}>
              <Text
                style={[
                  styles.speedButton,
                  speed === rate && styles.activeSpeedButton,
                ]}
              >
                {rate}x
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.volumeContainer}>
          <Text style={styles.volumeLabel}>Âm lượng:</Text>
          <Slider
            style={styles.volumeSlider}
            minimumValue={0}
            maximumValue={1}
            value={volume}
            minimumTrackTintColor="#6C63FF"
            maximumTrackTintColor="#D3D3D3"
            thumbTintColor="#6C63FF"
            onValueChange={(value) => changeVolume(value)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    // justifyContent: "center",
    // padding: 20,
    // borderRadius: 15,
    // backgroundColor: "#FFFFFF",
    // shadowColor: "#000",
    // shadowOpacity: 0.1,
    // shadowOffset: { width: 0, height: 5 },
    // shadowRadius: 10,
    // elevation: 10,
    // width: "90%",
    // marginHorizontal: "5%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  slider: {
    width: "auto",
    height: 40,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 5,
    marginBottom: 15,
  },
  timeText: {
    fontSize: 14,
    color: "#666",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 15,
  },
  icon: {
    padding: 10,
  },
  playIcon: {
    paddingHorizontal: 10,
  },
  speedContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  speedLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6C63FF",
    marginRight: 10,
  },
  speedButton: {
    marginHorizontal: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#EEE",
    color: "#6C63FF",
    fontWeight: "bold",
  },
  activeSpeedButton: {
    backgroundColor: "#6C63FF",
    color: "#FFF",
  },
  volumeContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    marginTop: 20,
  },
  volumeLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6C63FF",
    marginRight: 10,
  },
  volumeSlider: {
    flex: 1,
    width: "auto",
  },
  thumb: {
    width: 12, // Kích thước nút điều chỉnh nhỏ hơn
    height: 12,
    borderRadius: 6, // Hình tròn
    backgroundColor: "#FFFFFF",
  },
  track: {
    height: 20, // Chiều cao thanh mỏng hơn
  },
});
