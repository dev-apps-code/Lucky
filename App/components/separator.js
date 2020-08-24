import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { DEVICE_WIDTH, DEVICE_HEIGHT, alpha } from '../constants/constants';

const Separator = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <View style={styles.left} />
      {/* <View style={styles.right} /> */}
    </View>
  );
};

const TINT_COLOR = 'rgb(245, 245, 245)';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: 14 * alpha,
    width: DEVICE_WIDTH * 0.95,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  line: {
    alignSelf: 'center',
    backgroundColor: '#F1F1F1',
    height: 1 * alpha,
    position: 'absolute',
    width: 300 * alpha
  },
  left: {
    width: 14 * alpha,
    height: 14 * alpha,
    backgroundColor: 'rgb(228, 228, 228)',
    position: 'absolute',
    left: -7 * alpha,
    borderRadius: 7 * alpha
  },
  right: {
    width: 14 * alpha,
    height: 14 * alpha,
    backgroundColor: 'rgb(228, 228, 228)',
    position: 'absolute',
    right: -7 * alpha,
    borderRadius: 7 * alpha
  }
});

export default Separator;
