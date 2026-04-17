import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, Platform } from 'react-native';

interface PulseDotProps {
  color?: string;
}

export function PulseDot({ color = '#10B981' }: PulseDotProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 1.6,
            duration: 900,
            useNativeDriver: Platform.OS !== 'web',
            easing: Easing.out(Easing.ease),
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 900,
            useNativeDriver: Platform.OS !== 'web',
          }),
        ]),
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 1,
            duration: 0,
            useNativeDriver: Platform.OS !== 'web',
          }),
          Animated.timing(opacity, {
            toValue: 0.8,
            duration: 0,
            useNativeDriver: Platform.OS !== 'web',
          }),
        ]),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacity, scale]);

  return (
    <View style={{ width: 14, height: 14, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View
        style={{
          position: 'absolute',
          width: 14,
          height: 14,
          borderRadius: 7,
          backgroundColor: color,
          transform: [{ scale }],
          opacity,
        }}
      />
      <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: color }} />
    </View>
  );
}
