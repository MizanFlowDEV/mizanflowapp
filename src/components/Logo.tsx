import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

interface LogoProps {
  size?: number;
  color?: string;
}

export function Logo({ size = 120, color = '#FFD700' }: LogoProps) {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox="0 0 120 120">
        {/* Balance Scale Base */}
        <Path
          d="M60 30 L60 90"
          stroke={color}
          strokeWidth="6"
        />
        
        {/* Balance Scale Top */}
        <Path
          d="M30 40 L90 40"
          stroke={color}
          strokeWidth="6"
        />
        
        {/* Left Scale Pan */}
        <Circle cx="40" cy="70" r="20" fill="none" stroke={color} strokeWidth="4" />
        {/* Calendar Icon in Left Pan */}
        <Rect x="30" y="60" width="20" height="20" fill="none" stroke={color} strokeWidth="3" />
        <Path
          d="M30 65 L50 65"
          stroke={color}
          strokeWidth="3"
        />
        
        {/* Right Scale Pan */}
        <Circle cx="80" cy="70" r="20" fill="none" stroke={color} strokeWidth="4" />
        {/* Dollar Sign in Right Pan */}
        <Path
          d="M80 60 L80 80 M75 62 L85 62 M75 78 L85 78"
          stroke={color}
          strokeWidth="3"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
}); 