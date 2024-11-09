import React from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';

class Overlay extends React.Component {
  CIRCULAR_SIZE = {
    xs: 40,
    sm: 50,
    md: 70,
    lg: 85,
    xl: 100,
  };

  render() {
    const { loading, size } = this.props;
    return loading ? (
      <View style={styles.overlay}>
        <ActivityIndicator
          size="large"
          color="white"
          style={[
            styles.spinner,
            { width: this.CIRCULAR_SIZE[size || 'md'], height: this.CIRCULAR_SIZE[size || 'md'] },
          ]}
        />
      </View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    color: 'white',
  },
});

export default Overlay;
