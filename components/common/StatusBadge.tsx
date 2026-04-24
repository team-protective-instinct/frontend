import { View, Text } from 'react-native';
import type { ThreatLevel, IncidentStatus } from '../../types';

// ─── Threat Level Badge ────────────────────────────────────────────────────────

interface ThreatBadgeProps {
  level: ThreatLevel;
  size?: 'sm' | 'md';
}

const THREAT_CONFIG: Record<ThreatLevel, { label: string; bg: string; text: string }> =
  {
    CRITICAL: { label: 'CRITICAL', bg: 'bg-threat-critical/20', text: 'text-threat-critical' },
    WARNING: { label: 'WARNING', bg: 'bg-threat-warning/20', text: 'text-threat-warning' },
    NORMAL: { label: 'NORMAL', bg: 'bg-threat-dismissed/20', text: 'text-threat-dismissed' },
  };

export const ThreatBadge: React.FC<ThreatBadgeProps> = ({ level, size = 'md' }) => {
  const cfg = THREAT_CONFIG[level];
  const padding = size === 'sm' ? 'px-2 py-0.5' : 'px-3 py-1';
  return (
    <View className={`self-start rounded-full ${cfg.bg} ${padding}`}>
      <Text className={`text-[10px] font-bold ${cfg.text} tracking-wide`}>
        {cfg.label}
      </Text>
    </View>
  );
};

// ─── Status Badge ──────────────────────────────────────────────────────────────

interface StatusBadgeProps {
  status: IncidentStatus;
  size?: 'sm' | 'md';
}

const STATUS_CONFIG: Record<IncidentStatus, { label: string; color: string }> = {
  PENDING: { label: 'PENDING', color: '#fb565b' },
  UNDER_INVESTIGATION: { label: 'INVESTIGATING', color: '#ffba00' },
  RESOLVED: { label: 'RESOLVED', color: '#00d992' },
  CONTAINED: { label: 'CONTAINED', color: '#3b82f6' },
  DISMISSED: { label: 'DISMISSED', color: '#8b949e' },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const cfg = STATUS_CONFIG[status];
  const dotSize = size === 'sm' ? 6 : 8;
  
  return (
    <View className="flex-row items-center self-start">
      <View 
        style={{ width: dotSize, height: dotSize, borderRadius: dotSize / 2, backgroundColor: cfg.color }} 
        className="mr-2"
      />
      <Text className={`text-[10px] font-bold text-text-muted tracking-wide`}>
        {cfg.label}
      </Text>
    </View>
  );
};
