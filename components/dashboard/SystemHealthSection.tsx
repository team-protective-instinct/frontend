import React from 'react';
import { View, Text } from 'react-native';
import { mockSystemHealth } from '../../data/mock';
import { SystemHealthCard } from './SystemHealthCard';

interface SystemHealthSectionProps {
  isDesktop: boolean;
}

export function SystemHealthSection({ isDesktop }: SystemHealthSectionProps) {
  return (
    <View className={`${isDesktop ? 'ml-6 w-96' : 'mx-4 mt-6'}`}>
      <Text className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">
        System Health Monitor
      </Text>
      <View>
        {mockSystemHealth.components.map((c) => (
          <SystemHealthCard key={c.id} component={c} />
        ))}
      </View>
    </View>
  );
}
