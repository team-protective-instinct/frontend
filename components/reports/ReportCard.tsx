import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThreatBadge } from '../common/StatusBadge';
import type { Report } from '../../types';

interface ReportCardProps {
  report: Report;
  onPress: () => void;
  isDesktop: boolean;
}

export function ReportCard({ report, onPress, isDesktop }: ReportCardProps) {
  const MCP_COLOR =
    report.mcpResult === 'SUCCESS'
      ? '#10B981'
      : report.mcpResult === 'FAILURE'
        ? '#EF4444'
        : '#F59E0B';
  const resolvedAt = new Date(report.resolvedAt).toLocaleString('ko-KR', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`mb-3 rounded-2xl border border-[#293548] bg-[#1E293B] p-5 active:opacity-70 ${isDesktop ? 'mx-2 min-w-[300px] flex-1' : 'mx-4'}`}>
      <View className="mb-3 flex-row items-start justify-between">
        <View className="mr-2 flex-1 flex-row flex-wrap items-center gap-2">
          <ThreatBadge level={report.threatLevel} size="sm" />
          <View className="rounded-full px-2 py-0.5" style={{ backgroundColor: `${MCP_COLOR}20` }}>
            <Text style={{ color: MCP_COLOR, fontSize: 10, fontWeight: 'bold' }}>
              {report.mcpResult === 'SUCCESS' ? '✓ ' : '✗ '}
              {report.mcpResult}
            </Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#64748B" />
      </View>

      <Text className="mb-1 text-base font-bold text-[#F1F5F9]">{report.title}</Text>

      <View className="mt-2 flex-row items-center gap-2">
        <Ionicons name="time-outline" size={13} color="#64748B" />
        <Text className="text-xs text-[#64748B]">{resolvedAt}</Text>
        <Text className="text-[#334155]">·</Text>
        <Ionicons name="person-outline" size={13} color="#64748B" />
        <Text className="text-xs text-[#64748B]">{report.approvedBy}</Text>
      </View>

      {report.feedbackComment && (
        <View className="mt-3 border-t border-[#293548] pt-3">
          <Text className="text-xs italic text-[#94A3B8]" numberOfLines={1}>
            💬 &quot;{report.feedbackComment}&quot;
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
