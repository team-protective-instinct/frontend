import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchPlaybooks } from '../services/playbooks';

export function usePlaybooks() {
  const query = useQuery({
    queryKey: ['playbooks'],
    queryFn: fetchPlaybooks,
    placeholderData: keepPreviousData,
  });

  const playbooks = query.data ?? [];
  const loading = query.isLoading;
  const error = query.isError
    ? query.error instanceof Error
      ? query.error.message
      : 'Failed to load playbooks.'
    : null;

  return {
    playbooks,
    loading,
    error,
    refetch: query.refetch,
  };
}
