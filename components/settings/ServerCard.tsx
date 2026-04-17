import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { VictimServer } from '../../types';

const STATUS_COLOR: Record<string, string> = {
  connected: '#10B981',
  degraded: '#F59E0B',
  disconnected: '#EF4444',
};
const STATUS_LABEL: Record<string, string> = {
  connected: 'Connected',
  degraded: 'Degraded',
  disconnected: 'Offline',
};

interface ServerCardProps {
  server: VictimServer;
  onDelete: () => void;
  isDesktop: boolean;
}

export function ServerCard({ server, onDelete, isDesktop }: ServerCardProps) {
  const color = STATUS_COLOR[server.agentStatus];

  return (
    <View
      className={`mb-4 rounded-2xl border border-[#334155] bg-[#1E293B] p-5 ${isDesktop ? 'mx-2 min-w-[300px] flex-1' : ''}`}>
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <View className="mb-2 flex-row items-center gap-2">
            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: color }} />
            <Text className="text-lg font-bold text-[#F1F5F9]">{server.name}</Text>
          </View>
          <View className="flex-row items-center gap-4">
            <View className="flex-row items-center gap-1.5">
              <Ionicons name="globe-outline" size={13} color="#64748B" />
              <Text className="font-mono text-xs text-[#64748B]">{server.ip}</Text>
            </View>
            <View className="rounded-full border border-[#334155] bg-[#0F172A] px-2.5 py-0.5">
              <Text className="text-[10px] font-bold uppercase text-[#94A3B8]">{server.os}</Text>
            </View>
          </View>
          <Text style={{ color, fontSize: 12, marginTop: 6, fontWeight: '600' }}>
            ● {STATUS_LABEL[server.agentStatus]}
          </Text>
        </View>
        <TouchableOpacity
          onPress={onDelete}
          className="rounded-xl border border-red-500/20 bg-red-500/10 p-2.5">
          <Ionicons name="trash-outline" size={18} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
