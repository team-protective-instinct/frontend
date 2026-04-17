import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EvidenceBlockProps {
  raw: string;
  source: string;
}

export function EvidenceBlock({ raw, source }: EvidenceBlockProps) {
  return (
    <View className="rounded-xl border border-[#1E3A5F] bg-[#020817] p-3">
      <View className="mb-2 flex-row items-center gap-1.5">
        <Ionicons name="document-text-outline" size={12} color="#64748B" />
        <Text className="font-mono text-xs text-[#64748B]">{source}</Text>
      </View>
      <Text
        className="text-xs leading-5 text-[#94A3B8]"
        style={{ fontFamily: 'monospace' }}
        selectable>
        {raw}
      </Text>
    </View>
  );
}
