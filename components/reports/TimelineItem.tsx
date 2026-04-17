import React from 'react';
import { View, Text } from 'react-native';
import { TimelineEvent } from '../../types';

const TIMELINE_COLOR: Record<TimelineEvent['status'], string> = {
  success: '#10B981',
  failure: '#EF4444',
  info: '#3B82F6',
};

interface TimelineItemProps {
  event: TimelineEvent;
  isLast: boolean;
}

export function TimelineItem({ event, isLast }: TimelineItemProps) {
  const color = TIMELINE_COLOR[event.status];
  const time = new Date(event.timestamp).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <View className="flex-row">
      {/* Left: line + dot */}
      <View className="mr-4 items-center" style={{ width: 24 }}>
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: `${color}25`,
            borderWidth: 2,
            borderColor: color,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: color }} />
        </View>
        {!isLast && (
          <View
            style={{ width: 2, flex: 1, backgroundColor: '#293548', marginTop: 4, marginBottom: 4 }}
          />
        )}
      </View>
      {/* Right: content */}
      <View className="flex-1 pb-5">
        <Text className="text-sm font-bold text-[#F1F5F9]">{event.label}</Text>
        {event.detail && <Text className="mt-0.5 text-xs text-[#94A3B8]">{event.detail}</Text>}
        <Text className="mt-1 font-mono text-xs text-[#64748B]">{time}</Text>
      </View>
    </View>
  );
}
