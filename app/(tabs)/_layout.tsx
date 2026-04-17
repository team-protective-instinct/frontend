import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, useWindowDimensions, Platform } from 'react-native';
import { mockSystemHealth } from '../../data/mock';
import { Sidebar } from '../../components/common/Sidebar';
import { PendingBadge } from '../../components/common/PendingBadge';
import { NAVIGATION_ITEMS, RouteName } from '../../constants/navigation';

export default function TabLayout() {
  const { width } = useWindowDimensions();
  const pendingCount = mockSystemHealth.pendingActions;

  // Desktop threshold: 1024px
  const isDesktop = width > 1024 && Platform.OS === 'web';

  return (
    <View className="flex-1 flex-row bg-[#0F172A]">
      {isDesktop && <Sidebar />}

      <View className="flex-1">
        {/* Hide on desktop */}
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: '#1E293B',
              borderTopColor: '#334155',
              borderTopWidth: 1,
              height: isDesktop ? 0 : 60,
              paddingBottom: isDesktop ? 0 : 8,
              display: isDesktop ? 'none' : 'flex',
            },
            tabBarActiveTintColor: '#8B5CF6',
            tabBarInactiveTintColor: '#64748B',
            tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
          }}>
          {NAVIGATION_ITEMS.map((item) => (
            <Tabs.Screen
              key={item.id}
              name={item.id}
              options={{
                title: item.name,
                tabBarIcon: ({ color, size }) => (
                  <View style={{ position: 'relative' }}>
                    <Ionicons name={item.icon as any} size={size} color={color} />
                    {item.id === RouteName.INCIDENTS && <PendingBadge count={pendingCount} />}
                  </View>
                ),
              }}
            />
          ))}
        </Tabs>
      </View>
    </View>
  );
}
