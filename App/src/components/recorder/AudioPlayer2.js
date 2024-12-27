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
    if (!url) {
      console.error("URL không hợp lệ.");
      return;
    }

    loadAudio();

    return () => {
      unloadAudio(); // Dọn dẹp khi component bị hủy.
    };
  }, [url]);

  const loadAudio = async () => {
    try {
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
    } catch (error) {
      console.error("Lỗi khi tải âm thanh:", error);
      setIsLoading(false);
    }
  };

  const unloadAudio = async () => {
    if (sound) {
      try {
        await sound.unloadAsync();
      } catch (error) {
        console.error("Lỗi khi giải phóng âm thanh:", error);
      } finally {
        setSound(null);
      }
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);

      if (status.didJustFinish) {
        setIsFinished(true);
        setIsPlayingState(false);
      }
    } else if (status.error) {
      console.error(`Lỗi phát âm thanh: ${status.error}`);
    }
  };

  const handlePlay = async () => {
    if (!sound) {
      console.error("Âm thanh chưa được tải.");
      return;
    }

    try {
      const status = await sound.getStatusAsync();
      if (!status.isPlaying) {
        setIsPlayingState(true);
        await sound.playAsync();
        setIsFinished(false);
        onPlay?.();
      }
    } catch (error) {
      if (error.message.includes("Player does not exist")) {
        console.error("Trạng thái âm thanh không tồn tại. Tải lại âm thanh...");
        await unloadAudio();
        await loadAudio();
        await handlePlay();
      } else {
        console.error("Lỗi khi phát âm thanh:", error);
      }
    }
  };

  const handlePause = async () => {
    if (!sound) {
      console.error("Không thể tạm dừng. Âm thanh không tồn tại.");
      return;
    }

    try {
      const status = await sound.getStatusAsync();
      if (status.isPlaying) {
        setIsPlayingState(false);
        await sound.pauseAsync();
      }
    } catch (error) {
      console.error("Lỗi khi tạm dừng âm thanh:", error);
    }
  };

  const handleReplay = async () => {
    if (!sound) {
      console.error("Âm thanh chưa được tải. Đang tải lại...");
      await loadAudio();
    }

    try {
      await sound.setPositionAsync(0);
      await sound.playAsync();
      setIsFinished(false);
      setIsPlayingState(true);
      onPlay?.();
    } catch (error) {
      console.error("Lỗi khi phát lại âm thanh:", error);
    }
  };

  const handleSliderChange = async (value) => {
    if (!sound) {
      console.error("Không thể thay đổi vị trí. Âm thanh không tồn tại.");
      return;
    }

    try {
      await sound.setPositionAsync(value);
    } catch (error) {
      console.error("Lỗi khi thay đổi vị trí âm thanh:", error);
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
            <TouchableOpacity
              onPress={isPlayingState ? handlePause : handlePlay}
            >
              <Ionicons
                name={isPlayingState ? "pause" : "play"}
                size={30}
                color="#FF6B6B"
              />
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
