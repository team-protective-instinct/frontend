import React from 'react';
import { View, Text } from 'react-native';
import { ActionItem } from '../../types';

interface ActionTableProps {
  items: ActionItem[];
}

const ACTION_LABEL: Record<string, string> = {
  quarantine_file: 'quarantine_file',
  terminate_process: 'terminate_process',
  block_ip: 'block_ip',
  isolate_host: 'isolate_host',
  kill_connection: 'kill_connection',
};

export function ActionTable({ items }: ActionTableProps) {
  if (items.length === 0) {
    return (
      <View className="items-center rounded-xl border border-[#334155] bg-[#1E293B] p-4">
        <Text className="text-sm text-[#64748B]">조치 계획 없음 (오탐 또는 분석 중)</Text>
      </View>
    );
  }

  return (
    <View className="overflow-hidden rounded-xl border border-[#334155]">
      {/* Table header */}
      <View className="flex-row bg-[#293548] px-3 py-2">
        {['대상', '조치 API', '파라미터', '정당성'].map((h) => (
          <Text key={h} className="flex-1 text-xs font-bold text-[#94A3B8]">
            {h}
          </Text>
        ))}
      </View>
      {items.map((item, idx) => (
        <View
          key={item.id}
          className={`flex-row px-3 py-3 ${idx % 2 === 0 ? 'bg-[#1E293B]' : 'bg-[#1A2535]'}`}>
          <Text className="flex-1 text-xs text-[#F1F5F9]">{item.target}</Text>
          <View className="flex-1">
            <View className="self-start rounded bg-violet-500/20 px-1.5 py-0.5">
              <Text className="font-mono text-xs text-violet-400" numberOfLines={1}>
                {ACTION_LABEL[item.action] ?? item.action}
              </Text>
            </View>
          </View>
          <Text className="flex-1 font-mono text-xs text-amber-400" numberOfLines={2}>
            {item.parameter}
          </Text>
          <Text className="flex-1 text-xs text-[#94A3B8]" numberOfLines={3}>
            {item.justification}
          </Text>
        </View>
      ))}
    </View>
  );
}
