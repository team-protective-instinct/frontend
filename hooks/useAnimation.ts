import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export const useFadeIn = (duration: number = 500, delay: number = 0) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration,
      delay,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, duration, delay]);

  return fadeAnim;
};

export const useSlideIn = (initialValue: number, toValue: number, duration: number = 300) => {
  const slideAnim = useRef(new Animated.Value(initialValue)).current;

  const slide = (target: number) => {
    Animated.timing(slideAnim, {
      toValue: target,
      duration,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  };

  return { slideAnim, slide };
};
