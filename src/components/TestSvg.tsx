import React from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

export default function TestSvg() {
  return (
    <View style={{ width: 100, height: 100, backgroundColor: 'white' }}>
      <Svg width="100%" height="100%" viewBox="0 0 100 100">
        <Circle cx="50" cy="50" r="45" fill="red" />
      </Svg>
    </View>
  );
} 