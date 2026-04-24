import { View, Text } from 'react-native';
import { Incident } from '../../../types';

interface ResponsePlanProps {
  incident: Incident;
}

export function ResponsePlan({ incident }: ResponsePlanProps) {
  if (incident.status !== 'PENDING') return null;

  return (
    <View className="mb-16">
      <Text className="text-[10px] font-bold text-[#8b949e] uppercase tracking-[0.3em] mb-4">Recommended Response Actions</Text>
      <View className="gap-4">
        {incident.recommended_actions.map(action => (
          <View key={action.id} className="bg-[#050507] border border-[#3d3a39] rounded-2xl p-5 shadow-sm">
            <View className="flex-row items-center mb-3">
              <View className="px-2.5 py-1 rounded bg-[#3d3a39] mr-3">
                <Text className="text-[10px] font-black text-[#f2f2f2] tracking-tighter uppercase">{action.action}</Text>
              </View>
              <Text className="text-xs font-mono font-bold text-[#00d992]">{action.parameter}</Text>
            </View>
            <Text className="text-xs leading-5 text-[#8b949e]">{action.description}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
