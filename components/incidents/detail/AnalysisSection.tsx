import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { IncidentDetail } from '../../../types';

interface AnalysisSectionProps {
  incident: IncidentDetail;
}

export function AnalysisSection({ incident }: AnalysisSectionProps) {
  return (
    <View className="mb-10">
      <Text className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#8b949e]">
        Decision Indicators
      </Text>
      <View className="shadow-inner rounded-2xl border border-[#3d3a39] bg-[#050507] p-6">
        <View className="gap-4">
          {incident.key_indicators.map((indicator, idx) => (
            <View key={idx} className="flex-row items-start">
              <View
                className={`rounded-full p-1 ${indicator.value ? 'bg-[#00d992]/20' : 'bg-[#fb565b]/20'}`}>
                <Ionicons
                  name={indicator.value ? 'checkmark' : 'close'}
                  size={12}
                  color={indicator.value ? '#00d992' : '#fb565b'}
                />
              </View>
              <View className="ml-4 flex-1">
                <Text className="mb-0.5 text-xs font-bold text-[#f2f2f2]">{indicator.label}</Text>
                <Text className="text-[10px] italic leading-4 text-[#8b949e]">
                  {indicator.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
