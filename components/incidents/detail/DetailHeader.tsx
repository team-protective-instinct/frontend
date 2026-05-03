import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { IncidentDetail } from '../../../types';

interface DetailHeaderProps {
  incident: IncidentDetail;
  onClose: () => void;
}

export function DetailHeader({ incident, onClose }: DetailHeaderProps) {
  return (
    <View className="border-b border-border bg-bg-primary px-6 py-5">
      <View className="flex-row items-start justify-between">
        <View className="mr-4 flex-1">
          <Text className="text-xl font-black text-text-primary" numberOfLines={1}>
            {incident.attack_type}
          </Text>
          <Text className="mt-1 text-xs text-text-secondary" numberOfLines={1}>
            {incident.targetName} · {incident.targetIp}
          </Text>
        </View>
        <TouchableOpacity onPress={onClose} className="rounded-full bg-border/20 p-2">
          <Ionicons name="close" size={24} color="#8b949e" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
