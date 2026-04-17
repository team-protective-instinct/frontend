import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockIncidents } from '../../data/mock';
import { ThreatScoreCard } from '../../components/dashboard/ThreatScoreCard';
import { SystemHealthSection } from '../../components/dashboard/SystemHealthSection';
import { IncidentRow } from '../../components/dashboard/IncidentRow';
import type { Incident } from '../../types';

export default function DashboardScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width > 1024 && Platform.OS === 'web';

  const handleIncidentPress = (incident: Incident) => {
    if (incident.status === 'PENDING' || incident.status === 'UNDER_INVESTIGATION') {
      router.push(`/action/${incident.id}`);
    } else {
      router.push(`/report/${incident.id}`);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0F172A]" edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Page Header */}
        <View
          className={`flex-row items-center justify-between px-6 pb-2 pt-6 ${isDesktop ? 'mx-auto w-full max-w-7xl' : ''}`}>
          <View>
            <Text className="text-3xl font-black tracking-tighter text-[#F1F5F9]">DASHBOARD</Text>
            <Text className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#64748B]">
              Real-time Infrastructure Monitoring
            </Text>
          </View>
          <View className="flex-row items-center gap-3">
            <TouchableOpacity className="rounded-xl border border-[#334155] bg-[#1E293B] p-3">
              <Ionicons name="cog-outline" size={20} color="#8B5CF6" />
            </TouchableOpacity>
            <TouchableOpacity className="rounded-xl border border-[#334155] bg-[#1E293B] p-3">
              <Ionicons name="notifications-outline" size={20} color="#8B5CF6" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Top Section (Score & Health) */}
        <View
          className={`flex-row flex-wrap ${isDesktop ? 'mx-auto mt-8 w-full max-w-7xl px-6' : ''}`}>
          <ThreatScoreCard isDesktop={isDesktop} />
          <SystemHealthSection isDesktop={isDesktop} />
        </View>

        {/* Recent Incidents */}
        <View className={`mt-10 ${isDesktop ? 'mx-auto w-full max-w-7xl px-6' : ''}`}>
          <View className="mb-6 flex-row items-center justify-between px-6">
            <View className="flex-row items-center gap-2">
              <View className="h-6 w-1.5 rounded-full bg-violet-500" />
              <Text className="text-lg font-bold tracking-tight text-[#F1F5F9]">
                Recent Incidents
              </Text>
            </View>
            <TouchableOpacity>
              <Text className="text-xs font-bold uppercase tracking-widest text-[#8B5CF6]">
                View All Reports
              </Text>
            </TouchableOpacity>
          </View>

          <View className={isDesktop ? '-mx-2 flex-row flex-wrap' : ''}>
            {mockIncidents.map((incident) => (
              <IncidentRow
                key={incident.id}
                incident={incident}
                isDesktop={isDesktop}
                onPress={() => handleIncidentPress(incident)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
