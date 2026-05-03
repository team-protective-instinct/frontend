import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { IncidentDetail } from '../../../types';

interface ThreatIntelligenceProps {
  incident: IncidentDetail;
}

export function ThreatIntelligence({ incident }: ThreatIntelligenceProps) {
  return (
    <View className="mb-10">
      <Text className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#8b949e]">
        Threat Intelligence
      </Text>
      <View className="rounded-xl border border-[#3d3a39] bg-[#050507] p-5 shadow-sm">
        <View className="mb-4 flex-row items-center">
          <View className="rounded-md bg-[#00d992]/10 p-1.5">
            <Ionicons name="shield-checkmark" size={14} color="#00d992" />
          </View>
          <Text className="ml-3 text-xs font-black uppercase tracking-wider text-[#f2f2f2]">
            Target Indicators
          </Text>
        </View>
        <View className="gap-3">
          <View className="flex-row items-center justify-between rounded-lg border border-[#3d3a39]/50 bg-[#101010] p-3">
            <Text className="text-[10px] font-bold uppercase tracking-tighter text-[#8b949e]">
              Attacker IP
            </Text>
            <Text className="font-mono text-xs font-bold text-[#00d992]">
              {incident.attack_ip || 'N/A'}
            </Text>
          </View>
          <View className="flex-row items-center justify-between rounded-lg border border-[#3d3a39]/50 bg-[#101010] p-3">
            <Text className="text-[10px] font-bold uppercase tracking-tighter text-[#8b949e]">
              Target IP
            </Text>
            <Text className="font-mono text-xs text-[#f2f2f2]">{incident.targetIp}</Text>
          </View>
          {incident.target_uris.length > 0 && (
            <View className="rounded-lg border border-[#3d3a39]/50 bg-[#101010] p-3">
              <Text className="mb-1 text-[10px] font-bold uppercase tracking-tighter text-[#8b949e]">
                Target URIs
              </Text>
              <Text className="font-mono text-[10px] text-[#f2f2f2]">
                {incident.target_uris.join(', ')}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
