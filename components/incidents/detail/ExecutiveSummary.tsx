import { View, Text } from 'react-native';

interface ExecutiveSummaryProps {
  summary: string;
}

export function ExecutiveSummary({ summary }: ExecutiveSummaryProps) {
  return (
    <View className="mb-10">
      <Text className="text-[10px] font-bold text-[#8b949e] uppercase tracking-[0.3em] mb-4">Executive Summary</Text>
      <View className="bg-[#00d992]/5 border-l-4 border-[#00d992] p-5 rounded-r-2xl shadow-sm">
        <Text className="text-sm font-medium leading-7 text-[#f2f2f2]">{summary}</Text>
      </View>
    </View>
  );
}
