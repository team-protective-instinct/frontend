import React from 'react';
import { View, Text } from 'react-native';
import { mockSystemHealth } from '../../data/mock';
import { PulseDot } from '../common/PulseDot';

interface ThreatScoreCardProps {
  isDesktop: boolean;
}

export function ThreatScoreCard({ isDesktop }: ThreatScoreCardProps) {
  const { overallThreatScore, agentRunning, pendingActions } = mockSystemHealth;

  const scoreColor =
    overallThreatScore >= 70 ? '#EF4444' : overallThreatScore >= 40 ? '#F59E0B' : '#10B981';

  const scoreLabel =
    overallThreatScore >= 70 ? 'CRITICAL' : overallThreatScore >= 40 ? 'WARNING' : 'SAFE';

  return (
    <View
      className={`rounded-2xl border border-[#334155] bg-[#1E293B] p-6 ${isDesktop ? 'flex-1' : 'mx-4 mt-4'}`}>
      {/* Header */}
      <View className="mb-6 flex-row items-center justify-between">
        <Text className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">
          AGENT-2 Security Monitor
        </Text>
        <View className="flex-row items-center gap-2">
          <PulseDot color={agentRunning ? '#10B981' : '#EF4444'} />
          <Text className="ml-1.5 text-xs font-bold text-[#10B981]">
            {agentRunning ? 'AI ACTIVE' : 'OFFLINE'}
          </Text>
        </View>
      </View>

      {/* Score */}
      <View className={`flex-row items-end justify-between ${isDesktop ? 'flex-1' : ''}`}>
        <View>
          <Text className="mb-2 text-xs text-[#94A3B8]">Threat Score</Text>
          <View className="flex-row items-baseline gap-1">
            <Text style={{ color: scoreColor, fontSize: 64, fontWeight: '800', lineHeight: 64 }}>
              {overallThreatScore}
            </Text>
            <Text className="mb-1 text-xl text-[#64748B]">/100</Text>
          </View>
          <View
            className="mt-3 self-start rounded-full px-4 py-1.5"
            style={{ backgroundColor: `${scoreColor}25` }}>
            <Text style={{ color: scoreColor, fontSize: 13, fontWeight: 'bold', letterSpacing: 2 }}>
              ● {scoreLabel}
            </Text>
          </View>
        </View>

        {/* Pending Badge */}
        <View className="items-center">
          <View className="items-center rounded-3xl bg-red-500 px-6 py-4 shadow-lg shadow-red-500/50">
            <Text className="text-4xl font-black text-white">{pendingActions}</Text>
            <Text className="mt-1 text-[10px] font-bold tracking-tighter text-red-200">
              PENDING ACTIONS
            </Text>
          </View>
          <Text className="mt-2 text-xs font-medium text-[#64748B]">관리자 결재 대기</Text>
        </View>
      </View>

      {/* Score bar */}
      <View className="mt-8 h-2.5 overflow-hidden rounded-full bg-[#0F172A]">
        <View
          style={{
            width: `${overallThreatScore}%`,
            backgroundColor: scoreColor,
            height: '100%',
            borderRadius: 9999,
          }}
        />
      </View>
    </View>
  );
}
