import React from 'react';
import { View, Text } from 'react-native';
import type { ThreatLevel, IncidentStatus } from '../../types';

// ─── Threat Level Badge ────────────────────────────────────────────────────────

interface ThreatBadgeProps {
  level: ThreatLevel;
  size?: 'sm' | 'md';
}

const THREAT_CONFIG: Record<ThreatLevel, { label: string; dot: string; bg: string; text: string }> =
  {
    CRITICAL: { label: 'CRITICAL', dot: '🔴', bg: 'bg-red-500/20', text: 'text-red-400' },
    WARNING: { label: 'WARNING', dot: '🟠', bg: 'bg-amber-500/20', text: 'text-amber-400' },
    NORMAL: { label: 'NORMAL', dot: '⚪', bg: 'bg-slate-500/20', text: 'text-slate-400' },
  };

export const ThreatBadge: React.FC<ThreatBadgeProps> = ({ level, size = 'md' }) => {
  const cfg = THREAT_CONFIG[level];
  const padding = size === 'sm' ? 'px-2 py-0.5' : 'px-3 py-1';
  const fontSize = size === 'sm' ? 'text-xs' : 'text-xs';
  return (
    <View className={`rounded-full ${cfg.bg} ${padding} flex-row items-center`}>
      <Text className={`${fontSize} font-bold ${cfg.text} tracking-wide`}>
        {cfg.dot} {cfg.label}
      </Text>
    </View>
  );
};

// ─── Status Badge ──────────────────────────────────────────────────────────────

interface StatusBadgeProps {
  status: IncidentStatus;
  size?: 'sm' | 'md';
}

const STATUS_CONFIG: Record<IncidentStatus, { label: string; bg: string; text: string }> = {
  PENDING: { label: 'PENDING', bg: 'bg-red-500/20', text: 'text-red-400' },
  UNDER_INVESTIGATION: { label: 'INVESTIGATING', bg: 'bg-amber-500/20', text: 'text-amber-400' },
  RESOLVED: { label: 'RESOLVED', bg: 'bg-emerald-500/20', text: 'text-emerald-400' },
  CONTAINED: { label: 'CONTAINED', bg: 'bg-blue-500/20', text: 'text-blue-400' },
  DISMISSED: { label: 'DISMISSED', bg: 'bg-slate-500/20', text: 'text-slate-400' },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const cfg = STATUS_CONFIG[status];
  const padding = size === 'sm' ? 'px-2 py-0.5' : 'px-3 py-1';
  return (
    <View className={`rounded-full ${cfg.bg} ${padding}`}>
      <Text className={`text-xs font-bold ${cfg.text} tracking-wide`}>{cfg.label}</Text>
    </View>
  );
};
