import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Incident } from '../../../types';
import { StatusBadge, ThreatBadge } from '../../common/StatusBadge';

interface DetailHeaderProps {
  incident: Incident;
  onClose: () => void;
}

export function DetailHeader({ incident, onClose }: DetailHeaderProps) {
  return (
    <View className="px-6 py-5 border-b border-[#3d3a39] flex-row justify-between items-center bg-[#050507]">
      <View className="flex-1 mr-4">
        <Text className="text-[10px] font-bold text-[#8b949e] uppercase tracking-[0.2em] mb-1">{incident.id}</Text>
        <Text className="text-xl font-black text-[#f2f2f2]" numberOfLines={1}>{incident.attack_type}</Text>
      </View>
      <TouchableOpacity onPress={onClose} className="p-2 rounded-full bg-[#3d3a39]/20">
        <Ionicons name="close" size={24} color="#8b949e" />
      </TouchableOpacity>
    </View>
  );
}
