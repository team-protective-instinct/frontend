import { Text, View } from 'react-native';
import { Incident } from '../../types';
import { StatusBadge, ThreatBadge } from '../common/StatusBadge';
import { Table } from '../common/Table';

interface IncidentListItemProps {
  incident: Incident;
  isDesktop: boolean;
  onPress: () => void;
  isLast: boolean;
}

export function IncidentListItem({ incident, isDesktop, onPress, isLast }: IncidentListItemProps) {
  return (
    <Table.Row onPress={onPress} isLast={isLast}>
      {isDesktop ? (
        <>
          <Table.Cell width="w-32">
            <Text className="text-xs font-mono font-bold text-text-primary">{incident.id}</Text>
          </Table.Cell>
          <Table.Cell width="w-28">
            <ThreatBadge level={incident.threatLevel} size="sm" />
          </Table.Cell>
          <Table.Cell width="w-24">
            <Text className={`text-xs font-bold ${incident.confidence_score >= 0.9 ? 'text-accent' : 'text-text-muted'}`}>
              {(incident.confidence_score * 100).toFixed(0)}%
            </Text>
          </Table.Cell>
          <Table.Cell>
            <Text className="text-sm font-bold text-text-primary">{incident.attack_type}</Text>
            <Text className="text-[10px] text-text-muted">{new Date(incident.detectedAt).toLocaleString()}</Text>
          </Table.Cell>
          <Table.Cell width="w-40">
            <Text className="text-xs font-mono text-text-secondary">{incident.targetIp}</Text>
          </Table.Cell>
          <Table.Cell width="w-28">
            <StatusBadge status={incident.status} size="sm" />
          </Table.Cell>
        </>
      ) : (
        <>
          <Table.Cell className="mr-2">
            <View className="flex-row items-center mb-1">
              <View className="mr-2">
                <ThreatBadge level={incident.threatLevel} size="sm" />
              </View>
              <Text className="text-sm font-bold text-text-primary flex-shrink" numberOfLines={1}>
                {incident.attack_type}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-[10px] text-text-muted">
                Detected {new Date(incident.detectedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
          </Table.Cell>
          <StatusBadge status={incident.status} size="sm" />
        </>
      )}
    </Table.Row>
  );
}
