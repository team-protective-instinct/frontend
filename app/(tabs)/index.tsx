import { useState } from 'react';
import { Animated, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThreatBadge } from '../../components/common/Badge';
import { useIsDesktop } from '../../hooks/useIsDesktop';
import { useOverview } from '../../hooks/useOverview';
import { IncidentDetailPanel } from '../../components/incidents/IncidentDetailPanel';
import { useFadeIn } from '../../hooks/useAnimation';
import { PulseDot } from '../../components/common/PulseDot';
import { SectionHeader } from '../../components/common/SectionHeader';
import { Link } from 'expo-router';
import type { IncidentDetail } from '../../types';

export default function OverviewScreen() {
  const isDesktop = useIsDesktop();
  const [selectedIncident, setSelectedIncident] = useState<IncidentDetail | null>(null);

  const { pendingCount, todayCount, resolvedCount, recentPending, loading, error } = useOverview();

  const fadeAnim1 = useFadeIn(500, 0);
  const fadeAnim2 = useFadeIn(500, 150);
  const fadeAnim3 = useFadeIn(500, 300);

  const renderWidget = (
    title: string,
    value: number,
    icon: string,
    color: string,
    sub: string,
    flex = 1,
    anim: any
  ) => (
    <Animated.View style={{ flex, opacity: anim }}>
      <View className="relative overflow-hidden rounded-xl border border-[#3d3a39] bg-[#101010] p-6 shadow-sm">
        <View className="absolute -right-2 -top-2 opacity-[0.03]">
          <Ionicons name={icon as any} size={120} color={color} />
        </View>
        <View className="mb-4 flex-row items-center">
          <View className="rounded-lg p-2" style={{ backgroundColor: `${color}20` }}>
            <Ionicons name={icon as any} size={18} color={color} />
          </View>
          <Text
            className="ml-3 flex-shrink text-[10px] font-bold uppercase tracking-widest text-[#8b949e]"
            numberOfLines={1}>
            {title}
          </Text>
        </View>
        <Text className="text-4xl font-black text-[#f2f2f2]">{value}</Text>
        <Text className="mt-2 text-[10px] font-bold text-[#b8b3b0]">{sub}</Text>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#050507]" edges={isDesktop ? [] : ['bottom']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: isDesktop ? 40 : 20 }}>
        {/* Header */}
        <View className="mb-8 flex-row items-end justify-between">
          <View>
            <Text className="text-3xl font-black tracking-tighter text-[#f2f2f2]">OVERVIEW</Text>
            <Text className="mt-1 text-sm font-medium text-[#8b949e]">
              Integrated Security Operations Dashboard
            </Text>
          </View>

          {isDesktop && (
            <View className="flex-row items-center rounded-lg border border-[#3d3a39] bg-[#101010] px-4 py-2">
              <View className="mr-2">
                <PulseDot />
              </View>
              <Text className="text-[10px] font-bold uppercase text-[#f2f2f2]">
                AI Sentinel: Monitoring
              </Text>
            </View>
          )}
        </View>

        {/* Widgets Grid */}
        <View className={`${isDesktop ? 'flex-row' : 'flex-col'} mb-10 gap-6`}>
          {renderWidget(
            'Pending Approvals',
            loading ? 0 : pendingCount,
            'alert-circle',
            '#fb565b',
            'REQUIRES IMMEDIATE ACTION',
            isDesktop ? 1 : 0,
            fadeAnim1
          )}
          <View className={`${isDesktop ? 'flex-1 flex-row' : 'flex-row'} gap-6`}>
            {renderWidget(
              "Today's Incidents",
              loading ? 0 : todayCount,
              'shield',
              '#ffba00',
              'TOTAL THREATS DETECTED',
              1,
              fadeAnim2
            )}
            {renderWidget(
              'Resolved',
              loading ? 0 : resolvedCount,
              'checkmark-circle',
              '#00d992',
              'THREATS NEUTRALIZED',
              1,
              fadeAnim3
            )}
          </View>
        </View>

        {/* Recent Incidents List */}
        <View>
          <View className="mb-6 flex-row items-center justify-between">
            <SectionHeader title="Pending Approvals" isDesktop={isDesktop} />
            <Link href="/incidents" asChild>
              <TouchableOpacity>
                <Text className="text-xs font-bold text-[#00d992]">VIEW ALL</Text>
              </TouchableOpacity>
            </Link>
          </View>

          <View className="overflow-hidden rounded-xl border border-[#3d3a39] bg-[#101010]">
            {loading ? (
              <View className="p-5">
                <Text className="text-sm text-text-muted">Loading...</Text>
              </View>
            ) : error ? (
              <View className="p-5">
                <Text className="text-sm text-red-500">{error}</Text>
              </View>
            ) : recentPending.length === 0 ? (
              <View className="p-5">
                <Text className="text-sm text-text-muted">No pending incidents</Text>
              </View>
            ) : (
              recentPending.map((incident, idx) => (
                <TouchableOpacity
                  key={incident.idx}
                  onPress={() => setSelectedIncident(incident as unknown as IncidentDetail)}
                  className={`flex-row items-center p-5 ${idx !== recentPending.length - 1 ? 'border-b border-[#3d3a39]' : ''} ${isDesktop ? 'hover:bg-[#f2f2f2]/[0.02]' : ''}`}>
                  <View className="mr-2 flex-1">
                    <View className="mb-1 flex-row items-center">
                      <View className="mr-2">
                        <ThreatBadge level={incident.severity} size="sm" />
                      </View>
                      <Text
                        className="flex-shrink text-sm font-bold text-text-primary"
                        numberOfLines={1}>
                        {incident.attack_type}
                      </Text>
                      {isDesktop && (
                        <Text className="ml-2 text-[10px] font-bold text-accent">
                          {(incident.confidence_score * 100).toFixed(0)}%
                        </Text>
                      )}
                    </View>
                    <View className="flex-row items-center">
                      {isDesktop && (
                        <>
                          <Text
                            className="font-mono text-[10px] text-text-muted"
                            numberOfLines={1}
                            ellipsizeMode="middle">
                            Attacker: {incident.targetIp}
                          </Text>
                          <Text className="mx-2 text-border">•</Text>
                        </>
                      )}
                      <Text className="flex-shrink text-[10px] text-text-muted" numberOfLines={1}>
                        Detected{' '}
                        {new Date(incident.detectedAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        </View>
      </ScrollView>

      <IncidentDetailPanel
        visible={!!selectedIncident}
        incidentIdx={null}
        preloadedIncident={selectedIncident}
        onClose={() => setSelectedIncident(null)}
      />
    </SafeAreaView>
  );
}
