import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsDesktop } from '../../hooks/useIsDesktop';

export default function SettingsScreen() {
  const isDesktop = useIsDesktop();
  const [activeSubModal, setActiveSubModal] = useState<string | null>(null);

  const settingGroups = [
    {
      title: 'Personalization',
      items: [
        { id: 'profile', icon: 'person-outline', label: 'User Profile', value: 'Admin User' },
        {
          id: 'notifications',
          icon: 'notifications-outline',
          label: 'Security Alerts',
          value: 'Real-time',
        },
      ],
    },
    {
      title: 'Security',
      items: [
        { id: 'api', icon: 'key-outline', label: 'API Management', value: '3 Active Keys' },
        { id: 'logs', icon: 'list-outline', label: 'Audit Logs', value: '' },
      ],
    },
  ];

  const renderSubContent = () => {
    switch (activeSubModal) {
      case 'profile':
        return (
          <View className="gap-8">
            <View className="items-center">
              <View className="h-24 w-24 items-center justify-center rounded-full border border-[#00d992] bg-[#00d992]/20">
                <Ionicons name="person" size={48} color="#00d992" />
              </View>
              <Text className="mt-4 text-xl font-black text-[#f2f2f2]">Admin User</Text>
              <Text className="text-sm text-[#8b949e]">admin@protective-instinct.ai</Text>
            </View>
            <View className="gap-4">
              <View className="rounded-2xl border border-[#3d3a39] bg-[#050507] p-5">
                <Text className="mb-1 text-[10px] font-bold uppercase text-[#8b949e]">Role</Text>
                <Text className="text-sm font-bold text-[#f2f2f2]">SOC Level 3 Analyst</Text>
              </View>
              <TouchableOpacity className="items-center rounded-2xl border border-[#3d3a39] bg-[#3d3a39]/20 p-5">
                <Text className="text-sm font-bold text-[#fb565b]">Change Password</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case 'notifications':
        return (
          <View className="gap-6">
            <View className="flex-row items-center justify-between rounded-2xl border border-[#3d3a39] bg-[#050507] p-5">
              <View>
                <Text className="text-sm font-bold text-[#f2f2f2]">Push Notifications</Text>
                <Text className="text-xs text-[#8b949e]">Alerts for critical threats</Text>
              </View>
              <View className="h-6 w-10 justify-center rounded-full bg-[#00d992] px-1">
                <View className="h-4 w-4 self-end rounded-full bg-[#050507]" />
              </View>
            </View>
            <View className="flex-row items-center justify-between rounded-2xl border border-[#3d3a39] bg-[#050507] p-5">
              <View>
                <Text className="text-sm font-bold text-[#f2f2f2]">Email Summaries</Text>
                <Text className="text-xs text-[#8b949e]">Daily security reports</Text>
              </View>
              <View className="h-6 w-10 justify-center rounded-full bg-[#3d3a39] px-1">
                <View className="h-4 w-4 rounded-full bg-[#050507]" />
              </View>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#050507]" edges={isDesktop ? [] : ['bottom']}>
      <View className="flex-1" style={{ padding: isDesktop ? 40 : 20 }}>
        <Text className="mb-1 text-3xl font-black tracking-tighter text-[#f2f2f2]">SETTINGS</Text>
        <Text className="mb-10 text-sm font-medium text-[#8b949e]">
          Manage your workspace and security preferences
        </Text>

        <ScrollView className="flex-1">
          {settingGroups.map((group) => (
            <View key={group.title} className="mb-10">
              <Text className="mb-4 ml-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#8b949e]">
                {group.title}
              </Text>
              <View className="overflow-hidden rounded-2xl border border-[#3d3a39] bg-[#101010]">
                {group.items.map((item, idx) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => setActiveSubModal(item.id)}
                    className={`flex-row items-center justify-between px-6 py-5 ${idx !== group.items.length - 1 ? 'border-b border-[#3d3a39]' : ''} hover:bg-[#f2f2f2]/[0.02]`}>
                    <View className="flex-row items-center">
                      <Ionicons name={item.icon as any} size={20} color="#00d992" />
                      <Text className="ml-4 text-sm font-bold text-[#f2f2f2]">{item.label}</Text>
                    </View>
                    <View className="flex-row items-center">
                      {item.value ? (
                        <Text className="mr-3 text-xs text-[#8b949e]">{item.value}</Text>
                      ) : null}
                      <Ionicons name="chevron-forward" size={16} color="#3d3a39" />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

          <TouchableOpacity className="mt-4 items-center rounded-2xl border border-[#fb565b]/20 bg-[#fb565b]/10 py-5">
            <Text className="text-sm font-black uppercase tracking-widest text-[#fb565b]">
              Sign Out
            </Text>
          </TouchableOpacity>

          <View className="mb-20 mt-10 items-center">
            <Text className="text-[10px] font-bold text-[#3d3a39]">
              PROTECTIVE INSTINCT SOC v1.2.0-PRO
            </Text>
          </View>
        </ScrollView>
      </View>

      {/* Settings Sub-Modal */}
      <Modal
        visible={!!activeSubModal}
        animationType={isDesktop ? 'none' : 'slide'}
        transparent={isDesktop}>
        <View
          className={`flex-1 ${isDesktop ? 'flex-row justify-end bg-black/60' : 'bg-[#050507]'}`}>
          {isDesktop && (
            <TouchableOpacity className="flex-1" onPress={() => setActiveSubModal(null)} />
          )}

          <SafeAreaView
            className={`${isDesktop ? 'w-[500px] border-l border-[#3d3a39] bg-[#101010]' : 'flex-1'}`}
            edges={['top', 'bottom']}>
            <View className="flex-row items-center justify-between border-b border-[#3d3a39] bg-[#050507] px-6 py-5">
              <Text className="text-xl font-black uppercase text-[#f2f2f2]">
                {activeSubModal?.replace('_', ' ')}
              </Text>
              <TouchableOpacity onPress={() => setActiveSubModal(null)} className="p-2">
                <Ionicons name="close" size={28} color="#8b949e" />
              </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 bg-[#101010] p-8">{renderSubContent()}</ScrollView>
          </SafeAreaView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
