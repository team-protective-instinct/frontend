import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useIsDesktop } from '../../../hooks/useIsDesktop';
import { useIncidents } from '../../../hooks/useIncidents';
import { IncidentFilterBar } from '../../../components/incidents/IncidentFilterBar';
import { IncidentListHeader } from '../../../components/incidents/IncidentListHeader';
import { IncidentListItem } from '../../../components/incidents/IncidentListItem';
import { Table } from 'components/common/Table';

export default function IncidentsScreen() {
  const isDesktop = useIsDesktop();
  const params = useLocalSearchParams();

  const {
    incidents,
    page,
    total,
    totalPages,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    severityFilter,
    setSeverityFilter,
    loading,
    error,
    canGoPrevious,
    canGoNext,
    goPrevious,
    goNext,
  } = useIncidents();

  const emptyText = loading
    ? 'Loading incidents...'
    : error
      ? 'Failed to load incidents.'
      : 'No incidents found.';

  const handleIncidentPress = (incidentIdx: number) => {
    router.push({
      pathname: '/incidents/[incident_idx]',
      params: { ...params, incident_idx: incidentIdx },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-bg-primary" edges={isDesktop ? [] : ['bottom']}>
      <View className="flex-1" style={{ padding: isDesktop ? 40 : 20 }}>
        <IncidentFilterBar
          isDesktop={isDesktop}
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          severityFilter={severityFilter}
          setSeverityFilter={setSeverityFilter}
          totalCount={total}
        />

        <Table>
          {isDesktop && <IncidentListHeader />}

          <Table.Body
            data={incidents}
            emptyIcon="search-outline"
            emptyText={emptyText}
            renderItem={(incident, idx, isLast) => (
              <IncidentListItem
                key={incident.idx}
                incident={incident}
                isDesktop={isDesktop}
                onPress={() => handleIncidentPress(incident.idx)}
                isLast={isLast}
              />
            )}
          />

          {isDesktop && (
            <View className="flex-row items-center justify-between border-t border-border bg-bg-primary px-6 py-4">
              <Text className="text-[10px] font-bold text-text-muted">
                Page {page} of {totalPages || 1}
              </Text>
              <View className="flex-row gap-2">
                <TouchableOpacity
                  className={`rounded-lg border border-border bg-bg-secondary p-1.5 ${canGoPrevious ? '' : 'opacity-50'}`}
                  onPress={goPrevious}
                  disabled={!canGoPrevious}>
                  <Ionicons name="chevron-back" size={16} color="#8b949e" />
                </TouchableOpacity>
                <TouchableOpacity
                  className={`rounded-lg border border-border bg-bg-secondary p-1.5 ${canGoNext ? '' : 'opacity-50'}`}
                  onPress={goNext}
                  disabled={!canGoNext}>
                  <Ionicons name="chevron-forward" size={16} color="#8b949e" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Table>
      </View>
    </SafeAreaView>
  );
}
