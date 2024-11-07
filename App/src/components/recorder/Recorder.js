import React, { Component } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Buffer } from 'buffer';
import Permissions from 'react-native-permissions';
import Video from 'react-native-video';
import AudioRecord from 'react-native-audio-record';

export default class Recorder extends Component {
  state = {
    audioFile: '',
    recording: false,
    paused: true,
    loaded: false
  };

  async componentDidMount() {
    await this.checkPermission();

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
      // do something with audio chunk
    });
  }

  checkPermission = async () => {
    const p = await Permissions.check('microphone');
    console.log('permission check', p);
    if (p === 'authorized') return;
    return this.requestPermission();
  };

  requestPermission = async () => {
    const p = await Permissions.request('microphone');
    console.log('permission request', p);
  };

  start = () => {
    console.log('start record');
    this.setState({ audioFile: '', recording: true });
    AudioRecord.start();
  };

  stop = async () => {
    if (!this.state.recording) return;
    console.log('stop record');
    let audioFile = await AudioRecord.stop();
    console.log('audioFile', audioFile);
    this.setState({ recording: false });
    // wait till file is saved, else react-native-video will load incomplete file
    setTimeout(() => {
      this.setState({ audioFile });
    }, 1000);
  };

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
    const { audioFile } = this.state;
    console.log('audioFile', `file:/${audioFile}`);
    if (!audioFile) {
      console.log("No audio file to upload");
      return;
    }
  
    const formData = new FormData();
    formData.append("audio", {
      uri: `file://${audioFile}`,  // Prefix with `file://` for local files
      name: `${new Date().getTime().toString()}.wav`,
      type: "audio/wav",
    });
  
    try {
      await delay(5000);
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/v1/gpt/upload/dinarycloud`, {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        this.props.setVoice(data.url);
        console.log("Upload successful:", data);
      } else {
        console.log("Upload failed:", await response.text());
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  render() {
    const { recording, audioFile, paused } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Button onPress={this.start} title="Record" disabled={recording} />
          <Button onPress={this.stop} title="Stop" disabled={!recording} />
          {paused ? (
            <Button onPress={this.play} title="Play" disabled={!audioFile} />
          ) : (
            <Button onPress={this.pause} title="Pause" disabled={!audioFile} />
          )}
          <Button onPress={this.uploadAudio} title="Save" />
        </View>
        {!!audioFile && (
          <Video
            ref={ref => (this.player = ref)}
            source={{ uri: audioFile }}
            paused={paused}
            ignoreSilentSwitch={'ignore'}
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
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});