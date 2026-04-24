import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Incident } from '../../../types';

interface DetailActionButtonsProps {
  incident: Incident;
  isDesktop: boolean;
  onClose: () => void;
}

export function DetailActionButtons({ incident, isDesktop, onClose }: DetailActionButtonsProps) {
  if (incident.status !== 'PENDING') return null;

  return (
    <View 
      style={styles.footer}
      className={`p-6 border-t border-[#3d3a39] bg-[#101010] flex-row gap-4 ${isDesktop ? 'justify-end items-center' : ''}`}
    >
      <TouchableOpacity 
        className={`${isDesktop ? 'px-8' : 'flex-1'} bg-bg-secondary py-4 rounded-2xl items-center border border-[#3d3a39]`}
        onPress={onClose}
        activeOpacity={0.8}
      >
        <Text className="text-sm font-black text-text-primary uppercase tracking-widest">DISMISS</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        className={`${isDesktop ? 'px-10' : 'flex-[2]'} bg-accent py-4 rounded-2xl items-center shadow-[0_0_20px_rgba(0,217,146,0.4)]`}
        onPress={onClose}
        activeOpacity={0.8}
      >
        <Text className="text-sm font-black text-bg-primary uppercase tracking-widest">APPROVE & EXECUTE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  }
});
