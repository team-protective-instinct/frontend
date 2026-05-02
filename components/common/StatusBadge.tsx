import { View, Text } from 'react-native';
import type { SeverityLevel, IncidentStatus } from '../../types';

// ─── Threat Level Badge ────────────────────────────────────────────────────────

interface ThreatBadgeProps {
  level: SeverityLevel;
  size?: 'sm' | 'md';
}

const THREAT_CONFIG: Record<SeverityLevel, { label: string; bg: string; text: string }> = {
  critical: { label: 'CRITICAL', bg: 'bg-threat-critical/20', text: 'text-threat-critical' },
  high: { label: 'HIGH', bg: 'bg-threat-critical/20', text: 'text-threat-critical' },
  medium: { label: 'MEDIUM', bg: 'bg-threat-warning/20', text: 'text-threat-warning' },
  low: { label: 'LOW', bg: 'bg-threat-dismissed/20', text: 'text-threat-dismissed' },
};

export const ThreatBadge: React.FC<ThreatBadgeProps> = ({ level, size = 'md' }) => {
  const cfg = THREAT_CONFIG[level];
  const padding = size === 'sm' ? 'px-2 py-0.5' : 'px-3 py-1';
  return (
    <View className={`self-start rounded-full ${cfg.bg} ${padding}`}>
      <Text className={`text-[10px] font-bold ${cfg.text} tracking-wide`}>{cfg.label}</Text>
    </View>
  );
};

// ─── Status Badge ──────────────────────────────────────────────────────────────

interface StatusBadgeProps {
  status: IncidentStatus;
  size?: 'sm' | 'md';
}

const STATUS_CONFIG: Record<IncidentStatus, { label: string; bgClass: string }> = {
  analyzing: { label: 'ANALYZING', bgClass: 'bg-threat-warning' },
  pending_review: { label: 'PENDING', bgClass: 'bg-threat-critical' },
  resolved: { label: 'RESOLVED', bgClass: 'bg-threat-safe' },
  dismissed: { label: 'DISMISSED', bgClass: 'bg-threat-dismissed' },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const cfg = STATUS_CONFIG[status];
  const dotSize = size === 'sm' ? 6 : 8;

  return (
    <View className="flex-row items-center self-start">
      <View
        style={{
          width: dotSize,
          height: dotSize,
          borderRadius: dotSize / 2,
        }}
        className={`mr-2 ${cfg.bgClass}`}
      />
      <Text className={`text-[10px] font-bold tracking-wide text-text-muted`}>{cfg.label}</Text>
    </View>
  );
};
