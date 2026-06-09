import { View, Text, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useInfiniteIncidents } from '../../hooks/useInfiniteIncidents';
import { IncidentFilterBar } from './IncidentFilterBar';
import { IncidentListItem } from './IncidentListItem';

export function MobileIncidentsList() {
  const params = useLocalSearchParams();

  const {
    incidents,
    total,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    severityFilter,
    setSeverityFilter,
    loading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useInfiniteIncidents();

  const handleIncidentPress = (incidentIdx: number) => {
    router.push({
      pathname: '/incidents/[incident_idx]',
      params: { ...params, incident_idx: incidentIdx },
    });
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage && !loading) {
      fetchNextPage();
    }
  };

  const emptyText = loading
    ? 'Loading incidents...'
    : error
      ? 'Failed to load incidents.'
      : 'No incidents found.';

  return (
    <View className="flex-1 bg-bg-primary px-4 pb-4 pt-2">
      {/* Header and Search Bar */}
      <IncidentFilterBar
        isDesktop={false}
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        severityFilter={severityFilter}
        setSeverityFilter={setSeverityFilter}
        totalCount={total}
      />
      {/* Infinite Scroll FlatList styled as a Table Container */}
      <View className="flex-1 overflow-hidden rounded-xl border border-border bg-bg-secondary">
        <FlatList
          data={incidents}
          keyExtractor={(item) => String(item.idx)}
          renderItem={({ item, index }) => (
            <IncidentListItem
              incident={item}
              isDesktop={false}
              onPress={() => handleIncidentPress(item.idx)}
              isLast={index === incidents.length - 1}
            />
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.4}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              tintColor="#00d992"
              colors={['#00d992']}
            />
          }
          ListFooterComponent={
            isFetchingNextPage ? (
              <View className="items-center justify-center py-4">
                <ActivityIndicator size="small" color="#00d992" />
              </View>
            ) : null
          }
          ListEmptyComponent={
            !loading ? (
              <View className="items-center justify-center py-20">
                <Ionicons name="search-outline" size={48} color="#3d3a39" />
                <Text className="mt-4 text-text-muted">{emptyText}</Text>
              </View>
            ) : (
              <View className="items-center justify-center py-20">
                <ActivityIndicator size="large" color="#00d992" />
                <Text className="mt-4 text-text-muted">Loading incidents...</Text>
              </View>
            )
          }
        />
      </View>
    </View>
  );
}
