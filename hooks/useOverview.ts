import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchOverviewSummary } from '../services/overview';

export function useOverview() {
  const query = useQuery({
    queryKey: ['overview'],
    queryFn: fetchOverviewSummary,
    placeholderData: keepPreviousData,
  });

  const pendingCount = query.data?.pending_count ?? 0;
  const todayCount = query.data?.today_count ?? 0;
  const resolvedCount = query.data?.resolved_count ?? 0;
  const recentPending = query.data?.recent_pending ?? [];
  const loading = query.isLoading;
  const error = query.isError
    ? query.error instanceof Error
      ? query.error.message
      : 'Failed to load overview.'
    : null;

  return {
    pendingCount,
    todayCount,
    resolvedCount,
    recentPending,
    loading,
    error,
  };
}
