import React from 'react';
import { View, Text } from 'react-native';

interface PendingBadgeProps {
  count: number;
}

export function PendingBadge({ count }: PendingBadgeProps) {
  if (count === 0) return null;
  return (
    <View
      style={{
        position: 'absolute',
        top: -4,
        right: -10,
        backgroundColor: '#EF4444',
        borderRadius: 10,
        minWidth: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
      }}>
      <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>{count}</Text>
    </View>
  );
}
