import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThreatBadge, StatusBadge } from '../common/StatusBadge';
import { Incident } from '../../types';

interface ActionCardProps {
  incident: Incident;
  onPress: () => void;
  isSelected?: boolean;
}

export function ActionCard({ incident, onPress, isSelected }: ActionCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`mb-4 rounded-2xl border ${
        isSelected ? 'border-violet-500 bg-violet-500/5' : 'border-[#334155] bg-[#1E293B]'
      } overflow-hidden active:opacity-75`}>
      <View className="p-4">
        <View className="mb-2 flex-row items-center justify-between">
          <ThreatBadge level={incident.threatLevel} size="sm" />
          <Text className="font-mono text-[10px] text-[#64748B]">
            {new Date(incident.detectedAt).toLocaleTimeString('ko-KR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>

        <Text className="mb-1 text-base font-bold text-[#F1F5F9]">{incident.title}</Text>
        <Text className="text-xs text-[#94A3B8]" numberOfLines={1}>
          {incident.summary}
        </Text>

        <View className="mt-3 flex-row items-center justify-between border-t border-[#293548] pt-3">
          <View className="flex-row items-center">
            <Ionicons name="server-outline" size={12} color="#64748B" />
            <Text className="ml-1 text-[10px] text-[#64748B]">{incident.targetName}</Text>
          </View>
          <StatusBadge status={incident.status} size="sm" />
        </View>
      </View>
    </TouchableOpacity>
  );
}
