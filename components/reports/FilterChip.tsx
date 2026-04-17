import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface FilterChipProps {
  label: string;
  active: boolean;
  onPress: () => void;
  color?: string;
}

export function FilterChip({ label, active, onPress, color }: FilterChipProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="mb-2 mr-2 rounded-full border px-4 py-1.5"
      style={{
        backgroundColor: active ? (color ?? '#8B5CF620') : '#1E293B',
        borderColor: active ? (color ?? '#8B5CF6') : '#334155',
      }}>
      <Text
        style={{
          color: active ? (color ?? '#8B5CF6') : '#64748B',
          fontWeight: active ? '700' : '400',
        }}
        className="text-xs">
        {label}
      </Text>
    </TouchableOpacity>
  );
}
