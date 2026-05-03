import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { IncidentDetail } from '../../../types';

interface DetailActionButtonsProps {
  incident: IncidentDetail;
  isDesktop: boolean;
  onClose: () => void;
}

export function DetailActionButtons({ incident, isDesktop, onClose }: DetailActionButtonsProps) {
  if (incident.status !== 'pending_review') return null;

  return (
    <View
      style={styles.footer}
      className={`flex-row gap-4 border-t border-[#3d3a39] bg-[#101010] p-6 ${isDesktop ? 'items-center justify-end' : ''}`}>
      <TouchableOpacity
        className={`${isDesktop ? 'px-8' : 'flex-1'} items-center rounded-2xl border border-[#3d3a39] bg-bg-secondary py-4`}
        onPress={onClose}
        activeOpacity={0.8}>
        <Text className="text-sm font-black uppercase tracking-widest text-text-primary">
          DISMISS
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={`${isDesktop ? 'px-10' : 'flex-[2]'} items-center rounded-2xl bg-accent py-4 shadow-[0_0_20px_rgba(0,217,146,0.4)]`}
        onPress={onClose}
        activeOpacity={0.8}>
        <Text className="text-sm font-black uppercase tracking-widest text-bg-primary">
          APPROVE & EXECUTE
        </Text>
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
  },
});
