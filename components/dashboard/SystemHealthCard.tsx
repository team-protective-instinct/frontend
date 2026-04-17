import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { SystemComponent } from '../../types';

interface SystemHealthCardProps {
  component: SystemComponent;
}

const STATUS_ICON: Record<string, { icon: string; color: string; label: string }> = {
  connected: { icon: 'checkmark-circle', color: '#10B981', label: 'Connected' },
  degraded: { icon: 'warning', color: '#F59E0B', label: 'Degraded' },
  disconnected: { icon: 'close-circle', color: '#EF4444', label: 'Offline' },
};

export function SystemHealthCard({ component }: SystemHealthCardProps) {
  const cfg = STATUS_ICON[component.status];
  return (
    <View className="mb-3 flex-row items-center rounded-xl border border-[#293548] bg-[#0F172A] p-4">
      <View className="mr-4 h-10 w-10 items-center justify-center rounded-full bg-[#1E293B]">
        <Ionicons name={cfg.icon as any} size={24} color={cfg.color} />
      </View>
      <View className="flex-1">
        <Text className="text-sm font-bold text-[#F1F5F9]">{component.name}</Text>
        <View className="mt-1 flex-row items-center">
          <Text style={{ color: cfg.color, fontSize: 11, fontWeight: '600' }}>{cfg.label}</Text>
          {component.latencyMs !== undefined && (
            <>
              <Text className="mx-2 text-[#475569]">|</Text>
              <Text className="text-[11px] text-[#64748B]">Latency: {component.latencyMs}ms</Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
}
