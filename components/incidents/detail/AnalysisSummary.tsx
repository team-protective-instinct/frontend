import { View, Text } from 'react-native';

interface AnalysisSummaryProps {
  summary: string;
}

export function AnalysisSummary({ summary }: AnalysisSummaryProps) {
  return (
    <View className="mb-10">
      <Text className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#8b949e]">
        Analysis Summary
      </Text>
      <View className="rounded-r-2xl border-l-4 border-[#00d992] bg-[#00d992]/5 p-5 shadow-sm">
        <Text className="text-sm font-medium leading-7 text-[#f2f2f2]">{summary}</Text>
      </View>
    </View>
  );
}
