import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockIncidents } from '../../data/mock';
import { useIsDesktop } from '../../hooks/useIsDesktop';
import { useIncidentFilter } from '../../hooks/useIncidentFilter';
import { IncidentDetailPanel } from '../../components/incidents/IncidentDetailPanel';
import { IncidentFilterBar } from '../../components/incidents/IncidentFilterBar';
import { IncidentListHeader } from '../../components/incidents/IncidentListHeader';
import { IncidentListItem } from '../../components/incidents/IncidentListItem';
import type { Incident } from '../../types';
import { Table } from 'components/common/Table';

export default function IncidentsScreen() {
  const isDesktop = useIsDesktop();
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  // 데이터 필터링 및 검색 상태 로직 분리 
  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    severityFilter,
    setSeverityFilter,
    filteredIncidents,
  } = useIncidentFilter(mockIncidents);

  return (
    <SafeAreaView className="flex-1 bg-bg-primary" edges={isDesktop ? [] : ['bottom']}>
      <View className="flex-1" style={{ padding: isDesktop ? 40 : 20 }}>
        
        {/* 검색 및 필터 바 */}
        <IncidentFilterBar 
          isDesktop={isDesktop}
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          severityFilter={severityFilter}
          setSeverityFilter={setSeverityFilter}
          totalCount={filteredIncidents.length}
        />

        {/* 테이블 / 리스트 컨테이너 (추상화된 Table 컴포넌트 사용) */}
        <Table>
          {/* PC 헤더 */}
          {isDesktop && <IncidentListHeader />}

          <Table.Body 
            data={filteredIncidents}
            emptyIcon="search-outline"
            emptyText="No incidents found."
            renderItem={(incident, idx, isLast) => (
              <IncidentListItem 
                key={incident.id}
                incident={incident}
                isDesktop={isDesktop}
                onPress={() => setSelectedIncident(incident)}
                isLast={isLast}
              />
            )}
          />
          
          {/* 하단 페이지네이션 (테마 토큰 적용) - 데스크톱에서만 표시 */}
          {isDesktop && (
            <View className="bg-bg-primary border-t border-border px-6 py-4 flex-row justify-between items-center">
              <Text className="text-[10px] font-bold text-text-muted">Page 1 of 1</Text>
              <View className="flex-row gap-2">
                <TouchableOpacity className="p-1.5 rounded-lg border border-border bg-bg-secondary opacity-50">
                  <Ionicons name="chevron-back" size={16} color="#8b949e" />
                </TouchableOpacity>
                <TouchableOpacity className="p-1.5 rounded-lg border border-border bg-bg-secondary opacity-50">
                  <Ionicons name="chevron-forward" size={16} color="#8b949e" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Table>
      </View>

      <IncidentDetailPanel 
        visible={!!selectedIncident} 
        incident={selectedIncident} 
        onClose={() => setSelectedIncident(null)} 
      />
    </SafeAreaView>
  );
}
