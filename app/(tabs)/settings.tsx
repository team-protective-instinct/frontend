import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockVictimServers, mockAlarmConfig } from '../../data/mock';
import { ServerCard } from '../../components/settings/ServerCard';
import { SectionHeader } from '../../components/common/SectionHeader';
import type { VictimServer, OsType } from '../../types';

const OS_TYPES: OsType[] = ['Linux', 'Windows', 'MacOS', 'Unknown'];

export default function SettingsScreen() {
  const { width } = useWindowDimensions();
  const isDesktop = width > 1024 && Platform.OS === 'web';

  const [servers, setServers] = useState<VictimServer[]>(mockVictimServers);
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState('');
  const [formIp, setFormIp] = useState('');
  const [formOs, setFormOs] = useState<OsType>('Linux');

  const [threshold, setThreshold] = useState(mockAlarmConfig.threatScoreThreshold);
  const [pushEnabled, setPushEnabled] = useState(mockAlarmConfig.enablePushNotification);
  const [alertEmail, setAlertEmail] = useState(mockAlarmConfig.alertEmail ?? '');

  const handleAddServer = () => {
    if (!formName.trim() || !formIp.trim()) {
      Alert.alert('입력 오류', '서버명과 IP 주소를 입력하세요.');
      return;
    }
    const newServer: VictimServer = {
      id: `srv${Date.now()}`,
      name: formName.trim(),
      ip: formIp.trim(),
      os: formOs,
      registered: new Date().toISOString(),
      agentStatus: 'disconnected',
    };
    setServers((prev) => [...prev, newServer]);
    setFormName('');
    setFormIp('');
    setFormOs('Linux');
    setShowForm(false);
    Alert.alert('✅ 등록 완료', `${newServer.name} (${newServer.ip})가 등록되었습니다.`);
  };

  const handleDeleteServer = (id: string) => {
    const srv = servers.find((s) => s.id === id);
    Alert.alert('서버 삭제', `"${srv?.name}"을(를) 삭제할까요?`, [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => setServers((prev) => prev.filter((s) => s.id !== id)),
      },
    ]);
  };

  const handleSaveAlarm = () => {
    Alert.alert('✅ 저장 완료', `위협 점수 ${threshold}점 이상 시 알람이 전송됩니다.`);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0F172A]" edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}>
        {/* Header */}
        <View className={`px-6 pb-6 pt-6 ${isDesktop ? 'mx-auto w-full max-w-7xl' : ''}`}>
          <Text className="text-3xl font-black tracking-tighter text-[#F1F5F9]">SETTINGS</Text>
          <Text className="mt-1 text-xs font-semibold uppercase tracking-widest text-[#64748B]">
            Infrastructure & Agent Management
          </Text>
        </View>

        <View
          className={`flex-row flex-wrap ${isDesktop ? 'mx-auto w-full max-w-7xl gap-8 px-6' : 'px-4'}`}>
          {/* Section: Servers */}
          <View className={isDesktop ? 'flex-[2]' : 'w-full'}>
            <SectionHeader title="🖥 Victim System Management" isDesktop={isDesktop} />
            <View className={isDesktop ? '-mx-2 flex-row flex-wrap' : ''}>
              {servers.map((s) => (
                <ServerCard
                  key={s.id}
                  server={s}
                  isDesktop={isDesktop}
                  onDelete={() => handleDeleteServer(s.id)}
                />
              ))}
            </View>

            {/* Add Server Button */}
            <TouchableOpacity
              onPress={() => setShowForm(!showForm)}
              className={`mb-6 flex-row items-center justify-center gap-2 rounded-2xl border border-violet-500/30 bg-violet-500/10 py-4 ${isDesktop ? 'mx-2' : ''}`}>
              <Ionicons
                name={showForm ? 'remove-circle-outline' : 'add-circle-outline'}
                size={20}
                color="#8B5CF6"
              />
              <Text className="text-sm font-bold text-violet-400">
                {showForm ? 'Cancel Registration' : 'Register New Server'}
              </Text>
            </TouchableOpacity>

            {/* Register Form */}
            {showForm && (
              <View
                className={`mb-8 rounded-2xl border border-[#334155] bg-[#1E293B] p-6 shadow-xl ${isDesktop ? 'mx-2' : ''}`}>
                <Text className="mb-6 text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
                  New Server Registration
                </Text>

                <View className="mb-4">
                  <Text className="mb-2 text-xs font-semibold text-[#64748B]">Server Name</Text>
                  <TextInput
                    value={formName}
                    onChangeText={setFormName}
                    placeholder="e.g. Finance Database Tier"
                    placeholderTextColor="#475569"
                    className="rounded-xl border border-[#334155] bg-[#0F172A] px-4 py-3 text-sm text-[#F1F5F9]"
                  />
                </View>

                <View className="mb-4">
                  <Text className="mb-2 text-xs font-semibold text-[#64748B]">IP Address</Text>
                  <TextInput
                    value={formIp}
                    onChangeText={setFormIp}
                    placeholder="e.g. 10.0.5.21"
                    placeholderTextColor="#475569"
                    keyboardType="numeric"
                    className="rounded-xl border border-[#334155] bg-[#0F172A] px-4 py-3 font-mono text-sm text-[#F1F5F9]"
                  />
                </View>

                <View className="mb-6">
                  <Text className="mb-2 text-xs font-semibold text-[#64748B]">OS Type</Text>
                  <View className="flex-row flex-wrap gap-2">
                    {OS_TYPES.map((os) => (
                      <TouchableOpacity
                        key={os}
                        onPress={() => setFormOs(os)}
                        className="rounded-full border px-4 py-1.5"
                        style={{
                          backgroundColor: formOs === os ? '#8B5CF620' : '#0F172A',
                          borderColor: formOs === os ? '#8B5CF6' : '#334155',
                        }}>
                        <Text
                          style={{
                            color: formOs === os ? '#8B5CF6' : '#64748B',
                            fontWeight: formOs === os ? '700' : '400',
                          }}
                          className="text-xs">
                          {os}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <TouchableOpacity
                  onPress={handleAddServer}
                  className="items-center rounded-xl border border-emerald-500/40 bg-emerald-500/20 py-4">
                  <Text className="text-sm font-bold text-emerald-400">Complete Registration</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Section: Config */}
          <View className={isDesktop ? 'flex-1' : 'w-full'}>
            <SectionHeader title="🔔 Alarm Preferences" isDesktop={isDesktop} />
            <View className="mb-8 rounded-2xl border border-[#334155] bg-[#1E293B] p-6">
              {/* Threshold */}
              <View className="mb-6">
                <View className="mb-4 flex-row items-center justify-between">
                  <Text className="text-sm font-semibold text-[#94A3B8]">Threat Threshold</Text>
                  <View className="rounded-full bg-red-500 px-3 py-1 shadow-md shadow-red-500/50">
                    <Text className="text-sm font-black text-white">{threshold}</Text>
                  </View>
                </View>
                <View className="flex-row items-center gap-4">
                  <TouchableOpacity onPress={() => setThreshold(Math.max(0, threshold - 5))}>
                    <Ionicons name="remove-circle-outline" size={32} color="#475569" />
                  </TouchableOpacity>
                  <View className="h-3 flex-1 overflow-hidden rounded-full bg-[#0F172A]">
                    <View
                      style={{
                        width: `${threshold}%`,
                        backgroundColor:
                          threshold >= 70 ? '#EF4444' : threshold >= 40 ? '#F59E0B' : '#10B981',
                        height: '100%',
                        borderRadius: 9999,
                      }}
                    />
                  </View>
                  <TouchableOpacity onPress={() => setThreshold(Math.min(100, threshold + 5))}>
                    <Ionicons name="add-circle-outline" size={32} color="#475569" />
                  </TouchableOpacity>
                </View>
                <Text className="mt-2 text-[11px] text-[#475569]">
                  Alerts will be triggered when global threat score exceeds {threshold}.
                </Text>
              </View>

              {/* Push toggle */}
              <View className="mb-6 flex-row items-center justify-between border-t border-[#293548] py-5">
                <View>
                  <Text className="text-sm font-bold text-[#F1F5F9]">Push Notifications (FCM)</Text>
                  <Text className="mt-1 text-xs text-[#64748B]">
                    Real-time critical threat delivery
                  </Text>
                </View>
                <Switch
                  value={pushEnabled}
                  onValueChange={setPushEnabled}
                  trackColor={{ false: '#334155', true: '#8B5CF6' }}
                  thumbColor={pushEnabled ? '#F1F5F9' : '#64748B'}
                />
              </View>

              {/* Alert email */}
              <View className="mb-6 border-t border-[#293548] pt-5">
                <Text className="mb-2 text-xs font-semibold text-[#64748B]">
                  Notification Email
                </Text>
                <TextInput
                  value={alertEmail}
                  onChangeText={setAlertEmail}
                  placeholder="admin@agent2.io"
                  placeholderTextColor="#475569"
                  keyboardType="email-address"
                  className="rounded-xl border border-[#334155] bg-[#0F172A] px-4 py-3 text-sm text-[#F1F5F9]"
                />
              </View>

              <TouchableOpacity
                onPress={handleSaveAlarm}
                className="items-center rounded-xl border border-violet-500/40 bg-violet-500/20 py-4">
                <Text className="text-sm font-bold text-violet-400">Save Configuration</Text>
              </TouchableOpacity>
            </View>

            <SectionHeader title="ℹ️ System Diagnostics" isDesktop={isDesktop} />
            <View className="mb-10 rounded-2xl border border-[#334155] bg-[#1E293B] p-6">
              {[
                { label: 'Agent Version', value: 'AGENT-2 v0.1.0' },
                { label: 'Backend Stack', value: 'FastAPI / Elasticsearch' },
                { label: 'Protocol', value: 'MCP / Webhook' },
                { label: 'Build Metadata', value: '2026.04.17-release' },
              ].map(({ label, value }, idx) => (
                <View
                  key={label}
                  className={`flex-row items-center justify-between py-3 ${
                    idx !== 0 ? 'border-t border-[#293548]' : ''
                  }`}>
                  <Text className="text-[11px] font-medium text-[#64748B]">{label}</Text>
                  <Text className="font-mono text-[10px] text-[#94A3B8]">{value}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
