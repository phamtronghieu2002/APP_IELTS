import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Buffer } from 'buffer';
import Permissions from 'react-native-permissions';
import Video from 'react-native-video';
import AudioRecord from 'react-native-audio-record';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Audio } from "expo-av";
export default class Recorder extends Component {
  state = {
    audioFile: '',
    recording: false,
    paused: true,
    loaded: false,
    countdown: 60,
    isCounting: false,
    save: false,
    isSaving: false,
  };

  async componentDidMount() {
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
    });
    const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      wavFile: `${new Date().getTime().toString()}.wav`
    };

    AudioRecord.init(options);

    AudioRecord.on('data', data => {
      const chunk = Buffer.from(data, 'base64');
      console.log('chunk size', chunk.byteLength);
    });
  }





  start = async () => {
    try {
      const res1 = await Audio.requestPermissionsAsync();


      if (res1.granted) {
        this.props.setVoice('');
        this.setState({ audioFile: '', recording: true, isCounting: true, countdown: 60 });
        AudioRecord.start();
      }
    } catch (error) {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
      });

    }
  };

  stop = async () => {
    try {
      if (!this.state.recording) return;
      console.log('stop record');
      let audioFile = await AudioRecord.stop();
      this.setState({ recording: false, isCounting: false, countdown: 60, audioFile, save: false });
    } catch (error) {

    }
  };

  handleCountdown = () => {
    if (this.state.isCounting && this.state.countdown > 0) {
      this.setState((prevState) => ({ countdown: prevState.countdown - 1 }));
    } else if (this.state.countdown === 0) {
      this.stop();
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isCounting && !prevState.isCounting) {
      this.countdownInterval = setInterval(this.handleCountdown, 1000);
    } else if (!this.state.isCounting && prevState.isCounting) {
      clearInterval(this.countdownInterval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.countdownInterval);
  }

  play = () => {
    if (!this.state.loaded) this.player.seek(0);
    this.setState({ paused: false, loaded: true });
  };

  pause = () => {
    this.setState({ paused: true });
  };

  onLoad = data => {
    console.log('onLoad', data);
  };

  onProgress = data => {
    console.log('progress', data);
  };

  onEnd = () => {
    console.log('finished playback');
    this.setState({ paused: true, loaded: false });
  };

  onError = error => {
    console.log('error', error);
  };

  uploadAudio = async () => {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    this.setState({ isSaving: true });
    await delay(10000);
    const { audioFile } = this.state;
    if (!audioFile) return;

    const formData = new FormData();
    formData.append("audio", {
      uri: `file://${audioFile}`,
      name: `${new Date().getTime().toString()}.wav`,
      type: "audio/wav",
    });

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/v1/gpt/upload/dinarycloud`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        this.props.setVoice(data.url);
        this.setState({ save: true, audioFile: '' });
        console.log("Upload successful:", data);
      } else {
        console.log("Upload failed:", await response.text());
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      this.setState({ isSaving: false });
    }
  };

  render() {
    const { recording, audioFile, paused, countdown, save, isSaving } = this.state;

    const formatTime = (seconds) => {
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;

      return [
        hrs.toString().padStart(2, "0"),
        mins.toString().padStart(2, "0"),
        secs.toString().padStart(2, "0"),
      ].join(":");
    };

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={this.start}
            style={[styles.button, recording && styles.disabled]}
            disabled={recording}
          >
            <Icon name="mic" size={24} color={recording ? 'gray' : 'white'} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.stop}
            style={[styles.button, !recording && styles.disabled]}
            disabled={!recording}
          >
            <Icon name="stop" size={24} color={!recording ? 'gray' : 'white'} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.uploadAudio}
            style={[styles.button, (!audioFile || save) && styles.disabled]}
            disabled={!audioFile || save || isSaving}
          >
            {isSaving ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Icon name="save" size={24} color={!audioFile || save ? 'gray' : 'white'} />
            )}
          </TouchableOpacity>
        </View>

        {!!recording && (
          <Text style={styles.countdownText}>{formatTime(countdown)}</Text>
        )}

        {!!audioFile && (
          <Video
            ref={(ref) => (this.player = ref)}
            source={{ uri: audioFile }}
            paused={paused}
            ignoreSilentSwitch="ignore"
            onLoad={this.onLoad}
            onProgress={this.onProgress}
            onEnd={this.onEnd}
            onError={this.onError}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  disabled: {
    backgroundColor: '#ccc',
  },
  countdownText: {
    fontSize: 16,
    color: 'red',
    marginTop: 10,
  },
});