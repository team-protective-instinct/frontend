import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Incident } from '../../../types';

interface AnalysisSectionProps {
  incident: Incident;
}

export function AnalysisSection({ incident }: AnalysisSectionProps) {
  const renderAnalysisMarkdown = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      if (line.startsWith('### ')) {
        return <Text key={i} className="text-base font-black text-[#f2f2f2] mt-4 mb-2">{line.replace('### ', '')}</Text>;
      }
      if (line.startsWith('- ')) {
        return (
          <View key={i} className="flex-row items-start mb-2 pr-4">
            <View className="w-1.5 h-1.5 rounded-full bg-[#00d992] mt-2 mr-3" />
            <Text className="flex-1 text-sm text-[#b8b3b0] leading-6">{line.replace('- ', '')}</Text>
          </View>
        );
      }
      return <Text key={i} className="text-sm leading-6 text-[#b8b3b0] mb-3">{line}</Text>;
    });
  };

  return (
    <View className="mb-10">
      <Text className="text-[10px] font-bold text-[#8b949e] uppercase tracking-[0.3em] mb-4">AI Reasoning & Chain-of-Thought</Text>
      <View className="bg-[#050507] border border-[#3d3a39] rounded-2xl p-6 shadow-inner">
        {renderAnalysisMarkdown(incident.detailed_analysis)}
        
        <View className="mt-8 pt-8 border-t border-[#3d3a39]/50">
          <Text className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest mb-5">Decision Indicators</Text>
          <View className="gap-4">
            {incident.key_indicators.map((indicator, idx) => (
              <View key={idx} className="flex-row items-start">
                <View className={`p-1 rounded-full ${indicator.value ? 'bg-[#00d992]/20' : 'bg-[#fb565b]/20'}`}>
                  <Ionicons 
                    name={indicator.value ? "checkmark" : "close"} 
                    size={12} 
                    color={indicator.value ? "#00d992" : "#fb565b"} 
                  />
                </View>
                <View className="ml-4 flex-1">
                  <Text className="text-xs font-bold text-[#f2f2f2] mb-0.5">{indicator.label}</Text>
                  <Text className="text-[10px] text-[#8b949e] italic leading-4">{indicator.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
