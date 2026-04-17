import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Link, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { mockSystemHealth } from '../../data/mock';
import { NAVIGATION_ITEMS, RouteName } from '../../constants/navigation';

export function Sidebar() {
  const pathname = usePathname();
  const pendingCount = mockSystemHealth.pendingActions;

  return (
    <View className="w-64 flex-col border-r border-[#334155] bg-[#1E293B]">
      {/* Brand Header */}
      <View className="p-6">
        <Text className="text-2xl font-black tracking-tighter text-[#F1F5F9]">AGENT-2</Text>
        <Text className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[#64748B]">
          Security Dashboard
        </Text>
      </View>

      <ScrollView className="flex-1 px-4">
        {NAVIGATION_ITEMS.map((item) => {
          const isActive =
            pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <Link key={item.id} href={item.href as any} asChild>
              <TouchableOpacity
                className={`mb-2 flex-row items-center rounded-xl border px-4 py-3.5 ${
                  isActive
                    ? 'border-violet-500/30 bg-violet-500/10'
                    : 'border-transparent bg-transparent'
                }`}>
                <Ionicons
                  name={item.icon as any}
                  size={20}
                  color={isActive ? '#8B5CF6' : '#64748B'}
                />
                <Text
                  className={`ml-3 flex-1 text-sm font-semibold ${
                    isActive ? 'text-[#F1F5F9]' : 'text-[#64748B]'
                  }`}>
                  {item.name}
                </Text>

                {item.id === RouteName.INCIDENTS && pendingCount > 0 && (
                  <View className="ml-2 rounded-full bg-red-500 px-2 py-0.5">
                    <Text className="text-[10px] font-bold text-white">{pendingCount}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </Link>
          );
        })}
      </ScrollView>

      {/* Footer / Status */}
      <View className="border-t border-[#334155] p-6">
        <View className="flex-row items-center rounded-xl border border-[#334155] bg-[#0F172A] p-3">
          <View className="mr-2 h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <Text className="text-xs font-medium text-[#94A3B8]">AI Agent Active</Text>
        </View>
      </View>
    </View>
  );
}
