import { View, Text } from 'react-native';

interface PendingBadgeProps {
  count: number;
}

export function PendingBadge({ count }: PendingBadgeProps) {
  if (count === 0) return null;
  const displayCount = count > 99 ? '99+' : count.toString();

  return (
    <View className="h-[18px] min-w-[18px] items-center justify-center rounded-full bg-threat-critical px-1.5">
      <Text className="text-[10px] font-bold text-text-primary">{displayCount}</Text>
    </View>
  );
}
