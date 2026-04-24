import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Link, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { NAVIGATION_ITEMS, SETTINGS_NAV_ITEM } from '../../constants/navigation';

import { PulseDot } from './PulseDot';
import { PendingBadge } from './PendingBadge';
import { mockIncidents } from '../../data/mock';

export function Sidebar() {
  const pathname = usePathname();
  const pendingCount = mockIncidents.filter(i => i.status === 'PENDING').length;

  return (
    <View className="w-64 flex-col border-r border-border bg-bg-secondary">
      {/* Brand Header */}
      <View className="p-6 flex-row items-center">
        <View className="w-10 h-10 rounded bg-accent items-center justify-center mr-3 shadow-[0_0_15px_rgba(0,217,146,0.3)]">
          <Ionicons name="shield-checkmark" size={24} color="#050507" />
        </View>
        <View>
          <Text className="text-xl font-black tracking-tighter text-text-primary">보호본능</Text>
          <View className="flex-row items-center mt-0.5">
            <View className="mr-1.5 mt-0.5">
              <PulseDot />
            </View>
            <Text className="text-[10px] font-bold uppercase tracking-widest text-accent">AI SOC AGENT</Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 mt-4">
        {NAVIGATION_ITEMS.map((item) => {
          const isActive =
            pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <Link key={item.id} href={item.href as any} asChild>
              <TouchableOpacity
                className={`mb-2 flex-row items-center rounded-xl border px-4 py-3.5 ${
                  isActive
                    ? 'border-accent/30 bg-accent/10'
                    : 'border-transparent bg-transparent'
                }`}>
                <Ionicons
                  // 활성화 상태일 때는 '-outline'을 제거하여 속이 찬 아이콘을, 
                  // 비활성화 상태일 때는 외곽선만 있는 아이콘을 표시합니다.
                  name={isActive ? (item.icon.replace('-outline', '') as any) : (item.icon as any)}
                  size={20}
                  color={isActive ? '#00d992' : '#8b949e'}
                />
                <Text
                  className={`ml-3 text-sm font-semibold ${
                    isActive ? 'text-text-primary' : 'text-text-muted'
                  }`}>
                  {item.name}
                </Text>
                {item.id === 'incidents' && (
                  <View className="ml-2">
                    <PendingBadge count={pendingCount} />
                  </View>
                )}
              </TouchableOpacity>
            </Link>
          );
        })}
      </ScrollView>

      {/* Footer / Settings */}
      <View className="border-t border-border p-4">
        <Link href={SETTINGS_NAV_ITEM.href as any} asChild>
          <TouchableOpacity
            className={`flex-row items-center rounded-xl border px-4 py-3.5 ${
              pathname.startsWith('/settings')
                ? 'border-accent/30 bg-accent/10'
                : 'border-transparent bg-transparent'
            }`}>
            <Ionicons
              name={pathname.startsWith('/settings') ? 'settings' : 'settings-outline'}
              size={20}
              color={pathname.startsWith('/settings') ? '#00d992' : '#8b949e'}
            />
            <Text
              className={`ml-3 flex-1 text-sm font-semibold ${
                pathname.startsWith('/settings') ? 'text-text-primary' : 'text-text-muted'
              }`}>
              {SETTINGS_NAV_ITEM.name}
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

