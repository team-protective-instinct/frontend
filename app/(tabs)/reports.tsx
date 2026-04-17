import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockReports } from '../../data/mock';
import { FilterChip } from '../../components/reports/FilterChip';
import { ReportCard } from '../../components/reports/ReportCard';

const FILTER_LEVELS = ['ALL', 'CRITICAL', 'WARNING', 'NORMAL'] as const;
const FILTER_RESULT = ['ALL', 'SUCCESS', 'FAILURE', 'PARTIAL'] as const;

export default function ReportsScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width > 1024 && Platform.OS === 'web';

  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState<(typeof FILTER_LEVELS)[number]>('ALL');
  const [resultFilter, setResultFilter] = useState<(typeof FILTER_RESULT)[number]>('ALL');

  const filtered = mockReports.filter((r) => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase());
    const matchLevel = levelFilter === 'ALL' || r.threatLevel === levelFilter;
    const matchResult = resultFilter === 'ALL' || r.mcpResult === resultFilter;
    return matchSearch && matchLevel && matchResult;
  });

  const handlePress = (reportId: string) => {
    router.push(`/report/${reportId}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0F172A]" edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View className={`px-6 pb-6 pt-6 ${isDesktop ? 'mx-auto w-full max-w-7xl' : ''}`}>
          <Text className="text-3xl font-black tracking-tighter text-[#F1F5F9]">REPORTS</Text>
          <Text className="mt-1 text-xs font-semibold uppercase tracking-widest text-[#64748B]">
            Audit Logs & Incident History
          </Text>
        </View>

        <View className={`${isDesktop ? 'mx-auto w-full max-w-7xl px-6' : ''}`}>
          {/* Search & Filters Container */}
          <View className={`mb-6 ${isDesktop ? 'flex-row items-start gap-6' : 'px-4'}`}>
            {/* Search */}
            <View
              className={`mb-4 flex-row items-center rounded-xl border border-[#334155] bg-[#1E293B] px-4 ${isDesktop ? 'mb-0 flex-1' : ''}`}>
              <Ionicons name="search-outline" size={18} color="#64748B" />
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search incidents, threats, IPs..."
                placeholderTextColor="#475569"
                className="flex-1 px-3 py-3.5 text-sm text-[#F1F5F9]"
              />
              {search.length > 0 && (
                <TouchableOpacity onPress={() => setSearch('')}>
                  <Ionicons name="close-circle" size={18} color="#64748B" />
                </TouchableOpacity>
              )}
            </View>

            {/* Filters */}
            <View className={isDesktop ? 'flex-row gap-4' : ''}>
              <View>
                {!isDesktop && (
                  <Text className="mb-2 px-2 text-[10px] font-bold uppercase text-[#475569]">
                    Threat Level
                  </Text>
                )}
                <ScrollView
                  horizontal={!isDesktop}
                  showsHorizontalScrollIndicator={false}
                  className={isDesktop ? '' : 'mb-2'}>
                  {FILTER_LEVELS.map((l) => (
                    <FilterChip
                      key={l}
                      label={l}
                      active={levelFilter === l}
                      onPress={() => setLevelFilter(l)}
                      color={l === 'CRITICAL' ? '#EF4444' : l === 'WARNING' ? '#F59E0B' : undefined}
                    />
                  ))}
                </ScrollView>
              </View>
              <View>
                {!isDesktop && (
                  <Text className="mb-2 px-2 text-[10px] font-bold uppercase text-[#475569]">
                    Action Result
                  </Text>
                )}
                <ScrollView horizontal={!isDesktop} showsHorizontalScrollIndicator={false}>
                  {FILTER_RESULT.map((r) => (
                    <FilterChip
                      key={r}
                      label={r}
                      active={resultFilter === r}
                      onPress={() => setResultFilter(r)}
                      color={r === 'SUCCESS' ? '#10B981' : r === 'FAILURE' ? '#EF4444' : undefined}
                    />
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>

          {/* Report list */}
          <View className={isDesktop ? '-mx-2 flex-row flex-wrap' : ''}>
            {filtered.length === 0 ? (
              <View
                className={`mx-4 flex-1 items-center justify-center rounded-2xl border border-[#334155] bg-[#1E293B] p-12`}>
                <Ionicons name="search-outline" size={48} color="#334155" />
                <Text className="mt-4 text-sm font-medium text-[#64748B]">
                  No reports found matching your criteria.
                </Text>
              </View>
            ) : (
              filtered.map((r) => (
                <ReportCard
                  key={r.id}
                  report={r}
                  isDesktop={isDesktop}
                  onPress={() => handlePress(r.id)}
                />
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
