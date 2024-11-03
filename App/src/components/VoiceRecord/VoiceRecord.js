import React, { useState } from 'react';
import { View, Button, Text, PermissionsAndroid, Platform } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const VoiceRecord = () => {
  const [recording, setRecording] = useState();
  const [recordingUri, setRecordingUri] = useState('');

  // Request microphone permission
  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Microphone permission denied');
        return false;
      }
    }
    return true;
  };

  const startRecording = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setRecordingUri(uri);
    console.log('Recording stopped and stored at', uri);

    // Save the recording to the file system
    const newPath = `${FileSystem.documentDirectory}recording.m4a`;
    await FileSystem.moveAsync({
      from: uri,
      to: newPath,
    });
    console.log('Recording moved to:', newPath);

    // Share the recording file
    await shareRecording(newPath);
  };

  const shareRecording = async (uri) => {
    try {
      await Sharing.shareAsync(uri);
      console.log('Sharing successful');
    } catch (error) {
      console.error('Error sharing', error);
    }
  };

  return (
    <View>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
      {recordingUri ? (
        <Text>Recording saved at: {recordingUri}</Text>
      ) : null}
    </View>
  );
};

export default VoiceRecord;
