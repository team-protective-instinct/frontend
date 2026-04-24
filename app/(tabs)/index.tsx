import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockIncidents } from '../../data/mock';
import { ThreatBadge } from '../../components/common/StatusBadge';
import { useIsDesktop } from '../../hooks/useIsDesktop';
import { IncidentDetailPanel } from '../../components/incidents/IncidentDetailPanel';
import { useFadeIn } from '../../hooks/useAnimation';
import { PulseDot } from '../../components/common/PulseDot';
import { SectionHeader } from '../../components/common/SectionHeader';
import { Animated } from 'react-native';
import { Link } from 'expo-router';
import type { Incident } from '../../types';

export default function OverviewScreen() {
  const isDesktop = useIsDesktop();
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  // 애니메이션 훅 적용 (각각 시차를 두어 페이드인)
  const fadeAnim1 = useFadeIn(500, 0);
  const fadeAnim2 = useFadeIn(500, 150);
  const fadeAnim3 = useFadeIn(500, 300);

  const pendingIncidents = mockIncidents.filter(i => i.status === 'PENDING');
  const pendingCount = pendingIncidents.length;
  const todayCount = mockIncidents.length; // Simplified for mock
  const resolvedCount = mockIncidents.filter(i => i.status === 'RESOLVED').length;

  const renderWidget = (title: string, value: number, icon: string, color: string, sub: string, flex = 1, anim: any) => (
    <Animated.View style={{ flex, opacity: anim }}>
      <View className="bg-[#101010] border border-[#3d3a39] p-6 rounded-xl shadow-sm relative overflow-hidden">
        <View className="absolute -right-2 -top-2 opacity-[0.03]">
          <Ionicons name={icon as any} size={120} color={color} />
        </View>
        <View className="flex-row items-center mb-4">
          <View className="p-2 rounded-lg" style={{ backgroundColor: `${color}20` }}>
            <Ionicons name={icon as any} size={18} color={color} />
          </View>
          <Text className="ml-3 text-[10px] font-bold text-[#8b949e] uppercase tracking-widest flex-shrink" numberOfLines={1}>{title}</Text>
        </View>
        <Text className="text-4xl font-black text-[#f2f2f2]">{value}</Text>
        <Text className="mt-2 text-[10px] font-bold text-[#b8b3b0]">{sub}</Text>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#050507]" edges={isDesktop ? [] : ['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: isDesktop ? 40 : 20 }}>
        
        {/* Header */}
        <View className="mb-8 flex-row justify-between items-end">
          <View>
            <Text className="text-3xl font-black tracking-tighter text-[#f2f2f2]">OVERVIEW</Text>
            <Text className="mt-1 text-sm font-medium text-[#8b949e]">Integrated Security Operations Dashboard</Text>
          </View>
          
          {isDesktop && (
            <View className="flex-row items-center bg-[#101010] border border-[#3d3a39] px-4 py-2 rounded-lg">
              <View className="mr-2">
                <PulseDot />
              </View>
              <Text className="text-[10px] font-bold text-[#f2f2f2] uppercase">AI Sentinel: Monitoring</Text>
            </View>
          )}
        </View>

        {/* Widgets Grid */}
        <View className={`${isDesktop ? 'flex-row' : 'flex-col'} gap-6 mb-10`}>
          {renderWidget('Pending Approvals', pendingCount, 'alert-circle', '#fb565b', 'REQUIRES IMMEDIATE ACTION', isDesktop ? 1 : 0, fadeAnim1)}
          <View className={`${isDesktop ? 'flex-row flex-1' : 'flex-row'} gap-6`}>
            {renderWidget('Today\'s Incidents', todayCount, 'shield', '#ffba00', 'TOTAL THREATS DETECTED', 1, fadeAnim2)}
            {renderWidget('Resolved', resolvedCount, 'checkmark-circle', '#00d992', 'THREATS NEUTRALIZED', 1, fadeAnim3)}
          </View>
        </View>

        {/* Recent Incidents List */}
        <View>
          <View className="flex-row justify-between items-center mb-6">
            <SectionHeader title="Pending Approvals" isDesktop={isDesktop} />
            <Link href="/incidents" asChild>
              <TouchableOpacity>
                <Text className="text-xs font-bold text-[#00d992]">VIEW ALL</Text>
              </TouchableOpacity>
            </Link>
          </View>

          <View className="bg-[#101010] border border-[#3d3a39] rounded-xl overflow-hidden">
            {pendingIncidents.slice(0, 5).map((incident, idx) => (
              <TouchableOpacity 
                key={incident.id}
                onPress={() => setSelectedIncident(incident)}
                className={`p-5 flex-row items-center ${idx !== 4 ? 'border-b border-[#3d3a39]' : ''} ${isDesktop ? 'hover:bg-[#f2f2f2]/[0.02]' : ''}`}
              >
                <View className="flex-1 mr-2">
                  <View className="flex-row items-center mb-1">
                    <View className="mr-2">
                      <ThreatBadge level={incident.threatLevel} size="sm" />
                    </View>
                    <Text className="text-sm font-bold text-text-primary flex-shrink" numberOfLines={1}>{incident.attack_type}</Text>
                    {isDesktop && (
                      <Text className="ml-2 text-[10px] font-bold text-accent">{(incident.confidence_score * 100).toFixed(0)}%</Text>
                    )}
                  </View>
                  <View className="flex-row items-center">
                    {isDesktop && (
                      <>
                        <Text className="text-[10px] font-mono text-text-muted" numberOfLines={1} ellipsizeMode="middle">
                          Attacker: {incident.iocs.attacker_ips[0]}
                        </Text>
                        <Text className="mx-2 text-border">•</Text>
                      </>
                    )}
                    <Text className="text-[10px] text-text-muted flex-shrink" numberOfLines={1}>
                      Detected {new Date(incident.detectedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <IncidentDetailPanel 
        visible={!!selectedIncident} 
        incident={selectedIncident} 
        onClose={() => setSelectedIncident(null)} 
      />
    </SafeAreaView>
  );
}

