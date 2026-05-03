import { Text, View } from 'react-native';
import type { IncidentDetail } from '../../../types';

const statusColorMap: Record<string, string> = {
  pending_review: 'text-threat-warning',
  analyzing: 'text-threat-info',
  resolved: 'text-threat-safe',
  dismissed: 'text-text-muted',
};

const statusLabelMap: Record<string, string> = {
  pending_review: 'Pending',
  analyzing: 'Analyzing',
  resolved: 'Resolved',
  dismissed: 'Dismissed',
};

const severityColorMap: Record<string, string> = {
  critical: 'text-threat-critical',
  high: 'text-threat-high',
  medium: 'text-threat-warning',
  low: 'text-threat-safe',
};

const severityLabelMap: Record<string, string> = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

const MS_PER_MINUTE = 60_000;
const MS_PER_HOUR = 3_600_000;
const MS_PER_DAY = 86_400_000;

const pad2 = (value: number) => value.toString().padStart(2, '0');

const formatRelativeTime = (isoTime: string) => {
  const timestamp = Date.parse(isoTime);
  if (Number.isNaN(timestamp)) return '알 수 없음';

  const now = Date.now();
  const diff = Math.max(0, now - timestamp);

  if (diff < MS_PER_MINUTE) return '방금 전';
  if (diff < MS_PER_HOUR) return `${Math.floor(diff / MS_PER_MINUTE)}분 전`;
  if (diff < MS_PER_DAY) return `${Math.floor(diff / MS_PER_HOUR)}시간 전`;

  const days = Math.floor(diff / MS_PER_DAY);
  return `${days}일 전`;
};

const formatAbsoluteTime = (isoTime: string) => {
  const date = new Date(isoTime);
  if (Number.isNaN(date.getTime())) return '알 수 없음';

  return `${date.getFullYear()}/${pad2(date.getMonth() + 1)}/${pad2(date.getDate())} ${pad2(
    date.getHours()
  )}:${pad2(date.getMinutes())}:${pad2(date.getSeconds())}`;
};

interface QuickInfoCardsProps {
  incident: IncidentDetail;
}

interface QuickInfoCardProps {
  label: string;
  value: string;
  valueClassName?: string;
}

function QuickInfoCard({ label, value, valueClassName = 'text-text-primary' }: QuickInfoCardProps) {
  return (
    <View className="flex-1 rounded border border-border bg-bg-elevated px-4 py-3">
      <Text className="mb-1 text-[10px] font-bold tracking-wide text-text-muted">{label}</Text>
      <Text className={`text-sm font-bold ${valueClassName}`}>{value}</Text>
    </View>
  );
}

export function QuickInfoCards({ incident }: QuickInfoCardsProps) {
  return (
    <View className="mb-8">
      <View className="mb-4">
        <Text className="text-base font-semibold text-text-primary">
          <Text className="text-text-muted">발생 시각: </Text>
          {formatRelativeTime(incident.detectedAt)}
        </Text>
        <Text className="text-xs text-text-muted">{formatAbsoluteTime(incident.detectedAt)}</Text>
      </View>
      <View className="flex-row gap-3">
        <QuickInfoCard
          label="STATUS"
          value={statusLabelMap[incident.status] || incident.status}
          valueClassName={statusColorMap[incident.status] || 'text-text-muted'}
        />
        <QuickInfoCard
          label="SEVERITY"
          value={severityLabelMap[incident.severity] || incident.severity}
          valueClassName={severityColorMap[incident.severity] || 'text-text-muted'}
        />
        <QuickInfoCard
          label="CONFIDENCE"
          value={`${(incident.confidence_score * 100).toFixed(0)}%`}
        />
      </View>
    </View>
  );
}
