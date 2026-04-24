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
        { id: 'notifications', icon: 'notifications-outline', label: 'Security Alerts', value: 'Real-time' },
      ]
    },
    {
      title: 'Security',
      items: [
        { id: 'api', icon: 'key-outline', label: 'API Management', value: '3 Active Keys' },
        { id: 'logs', icon: 'list-outline', label: 'Audit Logs', value: '' },
      ]
    }
  ];

  const renderSubContent = () => {
    switch(activeSubModal) {
      case 'profile':
        return (
          <View className="gap-8">
            <View className="items-center">
              <View className="w-24 h-24 rounded-full bg-[#00d992]/20 border border-[#00d992] items-center justify-center">
                <Ionicons name="person" size={48} color="#00d992" />
              </View>
              <Text className="mt-4 text-xl font-black text-[#f2f2f2]">Admin User</Text>
              <Text className="text-sm text-[#8b949e]">admin@protective-instinct.ai</Text>
            </View>
            <View className="gap-4">
              <View className="bg-[#050507] p-5 rounded-2xl border border-[#3d3a39]">
                <Text className="text-[10px] font-bold text-[#8b949e] uppercase mb-1">Role</Text>
                <Text className="text-sm font-bold text-[#f2f2f2]">SOC Level 3 Analyst</Text>
              </View>
              <TouchableOpacity className="bg-[#3d3a39]/20 p-5 rounded-2xl border border-[#3d3a39] items-center">
                <Text className="text-sm font-bold text-[#fb565b]">Change Password</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case 'notifications':
        return (
          <View className="gap-6">
            <View className="flex-row justify-between items-center bg-[#050507] p-5 rounded-2xl border border-[#3d3a39]">
              <View>
                <Text className="text-sm font-bold text-[#f2f2f2]">Push Notifications</Text>
                <Text className="text-xs text-[#8b949e]">Alerts for critical threats</Text>
              </View>
              <View className="w-10 h-6 bg-[#00d992] rounded-full px-1 justify-center">
                <View className="w-4 h-4 bg-[#050507] rounded-full self-end" />
              </View>
            </View>
            <View className="flex-row justify-between items-center bg-[#050507] p-5 rounded-2xl border border-[#3d3a39]">
              <View>
                <Text className="text-sm font-bold text-[#f2f2f2]">Email Summaries</Text>
                <Text className="text-xs text-[#8b949e]">Daily security reports</Text>
              </View>
              <View className="w-10 h-6 bg-[#3d3a39] rounded-full px-1 justify-center">
                <View className="w-4 h-4 bg-[#050507] rounded-full" />
              </View>
            </View>
          </View>
        );
      default: return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#050507]" edges={isDesktop ? [] : ['bottom']}>
      <View className="flex-1" style={{ padding: isDesktop ? 40 : 20 }}>
        <Text className="text-3xl font-black tracking-tighter text-[#f2f2f2] mb-1">SETTINGS</Text>
        <Text className="text-sm font-medium text-[#8b949e] mb-10">Manage your workspace and security preferences</Text>

        <ScrollView className="flex-1">
          {settingGroups.map(group => (
            <View key={group.title} className="mb-10">
              <Text className="text-[10px] font-bold text-[#8b949e] uppercase tracking-[0.3em] mb-4 ml-2">{group.title}</Text>
              <View className="bg-[#101010] border border-[#3d3a39] rounded-2xl overflow-hidden">
                {group.items.map((item, idx) => (
                  <TouchableOpacity 
                    key={item.id}
                    onPress={() => setActiveSubModal(item.id)}
                    className={`px-6 py-5 flex-row items-center justify-between ${idx !== group.items.length - 1 ? 'border-b border-[#3d3a39]' : ''} hover:bg-[#f2f2f2]/[0.02]`}
                  >
                    <View className="flex-row items-center">
                      <Ionicons name={item.icon as any} size={20} color="#00d992" />
                      <Text className="ml-4 text-sm font-bold text-[#f2f2f2]">{item.label}</Text>
                    </View>
                    <View className="flex-row items-center">
                      {item.value ? <Text className="text-xs text-[#8b949e] mr-3">{item.value}</Text> : null}
                      <Ionicons name="chevron-forward" size={16} color="#3d3a39" />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

          <TouchableOpacity className="mt-4 bg-[#fb565b]/10 py-5 rounded-2xl border border-[#fb565b]/20 items-center">
            <Text className="text-sm font-black text-[#fb565b] uppercase tracking-widest">Sign Out</Text>
          </TouchableOpacity>
          
          <View className="items-center mt-10 mb-20">
            <Text className="text-[10px] font-bold text-[#3d3a39]">PROTECTIVE INSTINCT SOC v1.2.0-PRO</Text>
          </View>
        </ScrollView>
      </View>

      {/* Settings Sub-Modal */}
      <Modal visible={!!activeSubModal} animationType={isDesktop ? 'none' : 'slide'} transparent={isDesktop}>
        <View className={`flex-1 ${isDesktop ? 'flex-row justify-end bg-black/60' : 'bg-[#050507]'}`}>
          {isDesktop && <TouchableOpacity className="flex-1" onPress={() => setActiveSubModal(null)} />}
          
          <SafeAreaView className={`${isDesktop ? 'w-[500px] bg-[#101010] border-l border-[#3d3a39]' : 'flex-1'}`} edges={['top', 'bottom']}>
            <View className="px-6 py-5 border-b border-[#3d3a39] flex-row justify-between items-center bg-[#050507]">
              <Text className="text-xl font-black text-[#f2f2f2] uppercase">
                {activeSubModal?.replace('_', ' ')}
              </Text>
              <TouchableOpacity onPress={() => setActiveSubModal(null)} className="p-2">
                <Ionicons name="close" size={28} color="#8b949e" />
              </TouchableOpacity>
            </View>
            
            <ScrollView className="flex-1 p-8 bg-[#101010]">
              {renderSubContent()}
            </ScrollView>
          </SafeAreaView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
