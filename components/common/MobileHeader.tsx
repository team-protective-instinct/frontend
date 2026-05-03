import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export function MobileHeader() {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between border-b border-[#3d3a39] bg-[#101010] px-6 py-4">
      <View className="flex-row items-center">
        <View className="mr-2 h-8 w-8 items-center justify-center rounded bg-[#00d992]">
          <Ionicons name="shield-checkmark" size={20} color="#050507" />
        </View>
        <Text className="text-lg font-black tracking-tighter text-[#f2f2f2]">보호본능 AI SOC</Text>
      </View>

      <TouchableOpacity onPress={() => router.push('/settings')} className="p-2">
        <Ionicons name="settings-outline" size={24} color="#b8b3b0" />
      </TouchableOpacity>
    </View>
  );
}
