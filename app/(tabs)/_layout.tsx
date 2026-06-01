import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { Sidebar } from '../../components/common/Sidebar';
import { NAVIGATION_ITEMS } from '../../constants/navigation';
import { useIsDesktop } from '../../hooks/useIsDesktop';
import { MobileHeader } from '../../components/common/MobileHeader';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { PendingBadge } from '../../components/common/PendingBadge';
import { useOverview } from '../../hooks/useOverview';

export default function TabLayout() {
  const isDesktop = useIsDesktop();
  const insets = useSafeAreaInsets();
  const { pendingCount } = useOverview();

  return (
    <View className="flex-1 flex-row bg-[#050507]">
      {isDesktop && <Sidebar />}

      <View className="flex-1 bg-[#050507]">
        {!isDesktop && (
          <SafeAreaView edges={['top']} className="bg-[#101010]">
            <MobileHeader />
          </SafeAreaView>
        )}

        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: isDesktop
              ? { display: 'none' }
              : {
                  backgroundColor: '#101010',
                  borderTopWidth: 1,
                  borderTopColor: '#3d3a39',
                  // insets.bottom 값만큼 높이와 패딩을 추가하여 OS 하단 네비게이션 바와 겹치지 않게 함
                  height: 60 + insets.bottom,
                  paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
                  paddingTop: 8,
                },
            tabBarActiveTintColor: '#00d992',
            tabBarInactiveTintColor: '#8b949e',
          }}>
          {NAVIGATION_ITEMS.map((item) => (
            <Tabs.Screen
              key={item.id}
              name={item.id}
              options={{
                title: item.name,
                tabBarIcon: ({ color, size }) => (
                  <View>
                    <Ionicons name={item.icon as any} size={size} color={color} />
                    {item.id === 'incidents' && pendingCount > 0 && (
                      <View className="absolute -right-3 -top-1 z-10">
                        <PendingBadge count={pendingCount} />
                      </View>
                    )}
                  </View>
                ),
              }}
            />
          ))}
          {/* 하단 탭 바에서 Settings 숨김 처리 (단, 라우팅은 유지) */}
          <Tabs.Screen
            name="settings"
            options={{
              href: null,
            }}
          />
        </Tabs>
      </View>
    </View>
  );
}
