import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThreatBadge, StatusBadge } from '../common/StatusBadge';
import type { Incident } from '../../types';

interface IncidentRowProps {
  incident: Incident;
  onPress: () => void;
  isDesktop: boolean;
}

export function IncidentRow({ incident, onPress, isDesktop }: IncidentRowProps) {
  const date = new Date(incident.detectedAt);
  const timeStr = date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  const dateStr = isDesktop
    ? date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })
    : '';

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`mb-4 rounded-2xl border border-[#293548] bg-[#1E293B] p-5 shadow-sm transition-all active:opacity-75 ${isDesktop ? 'mx-2 flex-1' : 'mx-4'}`}>
      <View className="flex-row items-start justify-between">
        <View className="mr-4 flex-1">
          <View className="mb-3 flex-row flex-wrap items-center gap-2">
            <ThreatBadge level={incident.threatLevel} size="sm" />
            <StatusBadge status={incident.status} size="sm" />
          </View>
          <Text className="text-base font-bold text-[#F1F5F9]">{incident.title}</Text>
          <View className="mt-2 flex-row items-center">
            <Ionicons name="server-outline" size={13} color="#64748B" />
            <Text className="ml-1.5 text-xs text-[#64748B]" numberOfLines={1}>
              {incident.targetName} · {incident.targetIp}
            </Text>
          </View>
        </View>
        <View className="h-full items-end justify-between">
          <View className="items-end">
            <Text className="text-[11px] font-bold text-[#F1F5F9]">{timeStr}</Text>
            {isDesktop && <Text className="text-[10px] text-[#64748B]">{dateStr}</Text>}
          </View>
          <Ionicons name="chevron-forward" size={18} color="#475569" className="mt-4" />
        </View>
      </View>
    </TouchableOpacity>
  );
}
