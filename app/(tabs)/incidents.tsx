import React, { useState } from 'react';
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
import { ThreatBadge, StatusBadge } from '../../components/common/StatusBadge';
import { ActionCard } from '../../components/incidents/ActionCard';
import { DetailContent } from '../../components/incidents/DetailContent';

const ACTIONABLE_STATUSES = ['PENDING', 'UNDER_INVESTIGATION'];

export default function ActionCenterScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width > 1024 && Platform.OS === 'web';

  const actionable = mockIncidents.filter((i) => ACTIONABLE_STATUSES.includes(i.status));
  const resolved = mockIncidents.filter((i) => !ACTIONABLE_STATUSES.includes(i.status));

  const [selectedId, setSelectedId] = useState<string | null>(actionable[0]?.id || null);
  const selectedIncident = mockIncidents.find((i) => i.id === selectedId);

  const handlePress = (id: string) => {
    if (isDesktop) {
      setSelectedId(id);
    } else {
      router.push(`/action/${id}`);
    }
  };

  const renderContent = () => {
    if (isDesktop) {
      return (
        <View className="flex-1 flex-row">
          {/* Left Panel: List */}
          <View className="w-96 border-r border-[#334155] bg-[#0F172A]">
            <ScrollView className="p-6" showsVerticalScrollIndicator={false}>
              <Text className="mb-6 text-2xl font-black text-[#F1F5F9]">Incidents</Text>

              <Text className="mb-4 text-xs font-bold uppercase tracking-widest text-[#64748B]">
                Need Action ({actionable.length})
              </Text>
              {actionable.map((incident) => (
                <ActionCard
                  key={incident.id}
                  incident={incident}
                  isSelected={selectedId === incident.id}
                  onPress={() => handlePress(incident.id)}
                />
              ))}

              <Text className="mb-4 mt-8 text-xs font-bold uppercase tracking-widest text-[#64748B]">
                Recent Resolved
              </Text>
              {resolved.map((incident) => (
                <ActionCard
                  key={incident.id}
                  incident={incident}
                  isSelected={selectedId === incident.id}
                  onPress={() => handlePress(incident.id)}
                />
              ))}
            </ScrollView>
          </View>

          {/* Right Panel: Detail */}
          <View className="flex-1 bg-[#0F172A]">
            {selectedIncident ? (
              <DetailContent incident={selectedIncident} />
            ) : (
              <View className="flex-1 items-center justify-center p-20">
                <Ionicons name="flash-outline" size={48} color="#334155" />
                <Text className="mt-4 text-center font-medium text-[#64748B]">
                  Select an incident to view details and take defensive actions.
                </Text>
              </View>
            )}
          </View>
        </View>
      );
    }

    return (
      <SafeAreaView className="flex-1 bg-[#0F172A]" edges={['top']}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="px-4 pb-4 pt-4">
            <Text className="text-2xl font-black tracking-tight text-[#F1F5F9]">Action Center</Text>
            <Text className="mt-0.5 text-xs text-[#64748B]">AI 제안 방어 조치 검토 및 승인</Text>
          </View>

          <View className="mb-2">
            <Text className="mb-3 px-4 text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">
              처리 필요 ({actionable.length})
            </Text>
            {actionable.map((incident) => (
              <View key={incident.id} className="px-4">
                <ActionCard incident={incident} onPress={() => handlePress(incident.id)} />
              </View>
            ))}
          </View>

          <View className="mb-6 mt-3">
            <Text className="mb-3 px-4 text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">
              최근 처리 완료 ({resolved.length})
            </Text>
            {resolved.map((incident) => (
              <TouchableOpacity
                key={incident.id}
                className="mx-4 mb-2 flex-row items-center justify-between rounded-xl border border-[#293548] bg-[#1E293B] p-4 opacity-60 active:opacity-40"
                onPress={() => router.push(`/report/${incident.id}`)}>
                <View className="flex-1">
                  <View className="mb-1 flex-row flex-wrap items-center gap-2">
                    <ThreatBadge level={incident.threatLevel} size="sm" />
                    <StatusBadge status={incident.status} size="sm" />
                  </View>
                  <Text className="text-sm font-semibold text-[#F1F5F9]">{incident.title}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#64748B" />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  return renderContent();
}
