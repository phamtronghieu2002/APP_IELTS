// // import * as Speech from 'expo-speech';
// // import { Permissions, AUDIO_RECORDING } from 'expo-av';
// // import React, { useState, useEffect } from 'react';
// // import { Button, Text, View } from 'react-native';
// // import MainLayout from '../../layouts/MainLayout';
// // import HeaderScreen from '../../components/Header/HeaderScreen';

// // const Record = ({
// //     navigation
// // }) => {
// //     const [recording, setRecording] = useState(false);
// //     const [text, setText] = useState('');

// //     useEffect(() => {
// //         return () => {
// //             // Dừng ghi âm khi component unmount
// //             if (recording) {
// //                 stopRecording();
// //             }
// //         };
// //     }, [recording]);

// //     const startRecording = async () => {
// //         try {

// //             await Speech.startSpeechRecognitionAsync({
// //                 onResult: (result) => {
// //                     setText(result.text);
// //                 },
// //                 language: 'en-US',
// //             });
// //             setRecording(true);
// //         } catch (error) {
// //             console.error(error);
// //             setRecording(false); // Đảm bảo setRecording(false) khi có lỗi
// //         }
// //     };

// //     const stopRecording = async () => {
// //         try {
// //             await Speech.stopSpeechRecognitionAsync();
// //             setRecording(false);
// //         } catch (error) {
// //             console.error(error);
// //         }
// //     };

// //     return (
// //         <MainLayout>
// //             <HeaderScreen
// //                 navigation={navigation}
// //                 title="Ghi âm" />
// //             <View>
// //                 <Button
// //                     title={recording ? 'Dừng ghi âm' : 'Bắt đầu ghi âm'}
// //                     onPress={recording ? stopRecording : startRecording}
// //                 />
// //                 <Text>{text}</Text>
// //             </View>
// //         </MainLayout>
// //     );
// // };

// // export default Record;



// import {
//   ExpoSpeechRecognitionModule,
//   useSpeechRecognitionEvent,
// } from "expo-speech-recognition";

// import { useState } from "react";
// import { Button, ScrollView, View, Text } from "react-native";
// import MainLayout from "../../layouts/MainLayout";
// import HeaderScreen from "../../components/Header/HeaderScreen";
// import {AudioPlayer} from 'react-native-simple-audio-player';
// import { toHHMMSS } from "./utils.js";
// function Record({navigation}) {
//   // const [recognizing, setRecognizing] = useState(false);
//   // const [transcript, setTranscript] = useState("");

//   // useSpeechRecognitionEvent("start", () => setRecognizing(true));
//   // useSpeechRecognitionEvent("end", () => setRecognizing(false));
//   // useSpeechRecognitionEvent("result", (event) => {
//   //   setTranscript(event.results[0]?.transcript);
//   // });
//   // useSpeechRecognitionEvent("error", (event) => {
//   //   console.log("error code:", event.error, "error messsage:", event.message);
//   // });

//   // const handleStart = async () => {
//   //   const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
//   //   if (!result.granted) {
//   //     console.warn("Permissions not granted", result);
//   //     return;
//   //   }

//   //   console.log("transcript", transcript);
    
//   //   // Start speech recognition
//   //   ExpoSpeechRecognitionModule.start({
//   //     recordingOptions:{
//   //       persist: true
//   //     },
//   //     lang: "vi-VN",
//   //     interimResults: true,
//   //     maxAlternatives: 1,
//   //     continuous: false,
//   //     requiresOnDeviceRecognition: false,
//   //     addsPunctuation: false,
//   //     contextualStrings: ["Carlsen", "Nepomniachtchi", "Praggnanandhaa"],
//   //   });
//   // };

//   return (
//     <MainLayout>
//       <HeaderScreen title="Record" 
//       navigation={navigation}
//       />
//       <View className="pt-4">
//         {/* {!recognizing ? (
//           <Button title="Start" onPress={handleStart} />
//         ) : (
//           <Button title="Stop" onPress={ExpoSpeechRecognitionModule.stop} />
//         )}

//         <ScrollView>
//           <Text className="">
//             xin chao
//           </Text>
//           <Text>{transcript}</Text>
//         </ScrollView> */}

// <AudioPlayer
//         url={'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'}
//       />
//       </View>
//     </MainLayout>
//   );
// }

// export default Record;




import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { FontAwesome } from '@expo/vector-icons';

export default function Record() {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [speed, setSpeed] = useState(1.0);
  const [volume, setVolume] = useState(1.0);

  async function loadSound() {
    const { sound } = await Audio.Sound.createAsync(
      { uri: 'URL_CUA_AM_THANH' },
      { shouldPlay: true, rate: speed, volume }
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
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎶 Trình phát âm thanh 🎶</Text>

      <View className="">
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        minimumTrackTintColor="#6C63FF"
        maximumTrackTintColor="#D3D3D3"
        thumbTintColor="#6C63FF"
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
          <FontAwesome name="backward" size={24} color="#6C63FF" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={replay}>
          <FontAwesome name="repeat" size={24} color="#6C63FF" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlayPause}>
          <FontAwesome
            name={isPlaying ? 'pause-circle' : 'play-circle'}
            size={48}
            color="#6C63FF"
            style={styles.playIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={skipForward}>
          <FontAwesome name="forward" size={24} color="#6C63FF" style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.speedContainer}>
        <Text style={styles.speedLabel}>Tốc độ:</Text>
        {[1.0, 1.5, 2.0, 3.0].map((rate) => (
          <TouchableOpacity key={rate} onPress={() => changeSpeed(rate)}>
            <Text style={[styles.speedButton, speed === rate && styles.activeSpeedButton]}>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 10,
    width: '90%',
    marginHorizontal: '5%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  slider: {
    width: '90%',
    height: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 5,
    marginBottom: 15,
  },
  timeText: {
    fontSize: 14,
    color: '#666',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 15,
  },
  icon: {
    padding: 10,
  },
  playIcon: {
    paddingHorizontal: 20,
  },
  speedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  speedLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6C63FF',
    marginRight: 10,
  },
  speedButton: {
    marginHorizontal: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#EEE',
    color: '#6C63FF',
    fontWeight: 'bold',
  },
  activeSpeedButton: {
    backgroundColor: '#6C63FF',
    color: '#FFF',
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginTop: 20,
  },
  volumeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6C63FF',
    marginRight: 10,
  },
  volumeSlider: {
    flex: 1,
  },
});