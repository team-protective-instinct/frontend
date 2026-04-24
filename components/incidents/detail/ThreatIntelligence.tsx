import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Incident } from '../../../types';

interface ThreatIntelligenceProps {
  incident: Incident;
}

export function ThreatIntelligence({ incident }: ThreatIntelligenceProps) {
  return (
    <View className="mb-10">
      <Text className="text-[10px] font-bold text-[#8b949e] uppercase tracking-[0.3em] mb-4">Threat Intelligence</Text>
      <View className="flex-row flex-wrap gap-2 mb-4">
        {incident.mitre_attack_ids.map(id => (
          <View key={id} className="bg-[#19211c] px-3 py-1.5 rounded border border-[#3d3a39]">
            <Text className="text-[10px] font-mono font-bold text-[#b8b3b0]">{id}</Text>
          </View>
        ))}
      </View>
      <View className="bg-[#050507] rounded-xl border border-[#3d3a39] p-5 shadow-sm">
        <View className="flex-row items-center mb-4">
          <View className="p-1.5 bg-[#00d992]/10 rounded-md">
            <Ionicons name="shield-checkmark" size={14} color="#00d992" />
          </View>
          <Text className="ml-3 text-xs font-black text-[#f2f2f2] uppercase tracking-wider">Target Indicators</Text>
        </View>
        <View className="gap-3">
          <View className="flex-row justify-between items-center bg-[#101010] p-3 rounded-lg border border-[#3d3a39]/50">
            <Text className="text-[10px] font-bold text-[#8b949e] uppercase tracking-tighter">Attacker IP</Text>
            <Text className="text-xs font-mono font-bold text-[#00d992]">{incident.iocs.attacker_ips.join(', ')}</Text>
          </View>
          <View className="flex-row justify-between items-center bg-[#101010] p-3 rounded-lg border border-[#3d3a39]/50">
            <Text className="text-[10px] font-bold text-[#8b949e] uppercase tracking-tighter">Target IP</Text>
            <Text className="text-xs font-mono text-[#f2f2f2]">{incident.targetIp}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
