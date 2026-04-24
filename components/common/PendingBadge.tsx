import { View, Text } from 'react-native';

interface PendingBadgeProps {
  count: number;
}

export function PendingBadge({ count }: PendingBadgeProps) {
  if (count === 0) return null;
  const displayCount = count > 99 ? '99+' : count.toString();
  
  return (
    <View className="bg-threat-critical rounded-full min-w-[18px] h-[18px] justify-center items-center px-1.5">
      <Text className="text-text-primary text-[10px] font-bold">{displayCount}</Text>
    </View>
  );
}
