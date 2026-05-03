import { Text, View } from 'react-native';
import type { IncidentListItem as IncidentListItemType } from '../../types';
import { StatusBadge, ThreatBadge } from '../common/Badge';
import { Table } from '../common/Table';
import { INCIDENT_TABLE_COLUMNS } from './constants';

interface IncidentListItemProps {
  incident: IncidentListItemType;
  isDesktop: boolean;
  onPress: () => void;
  isLast: boolean;
}

export function IncidentListItem({ incident, isDesktop, onPress, isLast }: IncidentListItemProps) {
  return (
    <Table.Row onPress={onPress} isLast={isLast}>
      {isDesktop ? (
        <>
          <Table.Cell width={INCIDENT_TABLE_COLUMNS.id}>
            <Text className="font-mono text-xs font-bold text-text-primary">{incident.idx}</Text>
          </Table.Cell>
          <Table.Cell width={INCIDENT_TABLE_COLUMNS.severity}>
            <ThreatBadge level={incident.severity} size="sm" />
          </Table.Cell>
          <Table.Cell width={INCIDENT_TABLE_COLUMNS.confidence}>
            <Text
              className={`text-xs font-bold ${incident.confidence_score >= 0.9 ? 'text-accent' : 'text-text-muted'}`}>
              {(incident.confidence_score * 100).toFixed(0)}%
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text className="text-sm font-bold text-text-primary">{incident.attack_type}</Text>
            <Text className="text-[10px] text-text-muted">
              {new Date(incident.detectedAt).toLocaleString()}
            </Text>
          </Table.Cell>
          <Table.Cell width={INCIDENT_TABLE_COLUMNS.targetIp}>
            <Text className="font-mono text-xs text-text-secondary">{incident.targetIp}</Text>
          </Table.Cell>
          <Table.Cell width={INCIDENT_TABLE_COLUMNS.status}>
            <StatusBadge status={incident.status} size="sm" />
          </Table.Cell>
        </>
      ) : (
        <>
          <Table.Cell className="mr-2">
            <View className="mb-1 flex-row items-center">
              <View className="mr-2">
                <ThreatBadge level={incident.severity} size="sm" />
              </View>
              <Text className="flex-shrink text-sm font-bold text-text-primary" numberOfLines={1}>
                {incident.attack_type}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-[10px] text-text-muted">
                Detected{' '}
                {new Date(incident.detectedAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>
          </Table.Cell>
          <StatusBadge status={incident.status} size="sm" />
        </>
      )}
    </Table.Row>
  );
}
