import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { useLocalSearchParams, router } from 'expo-router';

import { fetchIncidents } from '../services/incidents';
import type { IncidentStatus, SeverityLevel } from '../types';

const DEFAULT_LIMIT = 20;
const SEARCH_DEBOUNCE_MS = 300;

const DEFAULTS = {
  limit: String(DEFAULT_LIMIT),
  q: '',
  status: 'ALL',
  severity: 'ALL',
};

function getFirstParam(param: string | string[] | undefined): string | undefined {
  if (Array.isArray(param)) return param[0];
  return param;
}

const VALID_STATUSES = new Set(['ALL', 'analyzing', 'pending_review', 'resolved', 'dismissed']);

function parseStatus(param: string | string[] | undefined): IncidentStatus | 'ALL' {
  const val = getFirstParam(param);
  if (val && VALID_STATUSES.has(val)) return val as IncidentStatus | 'ALL';
  return DEFAULTS.status as IncidentStatus | 'ALL';
}

const VALID_SEVERITIES = new Set(['ALL', 'critical', 'high', 'medium', 'low']);

function parseSeverity(param: string | string[] | undefined): SeverityLevel | 'ALL' {
  const val = getFirstParam(param);
  if (val && VALID_SEVERITIES.has(val)) return val as SeverityLevel | 'ALL';
  return DEFAULTS.severity as SeverityLevel | 'ALL';
}

function parseQuery(param: string | string[] | undefined): string {
  return getFirstParam(param) || DEFAULTS.q;
}

function setRouteParams(params: Record<string, string | number | undefined>) {
  try {
    router.setParams(params);
  } catch {}
}

export function useInfiniteIncidents() {
  const params = useLocalSearchParams();

  const urlSearch = parseQuery(params.q);
  const statusFilter = parseStatus(params.status);
  const severityFilter = parseSeverity(params.severity);

  const urlParams = useMemo(
    () => ({
      q: urlSearch,
      status: statusFilter,
      severity: severityFilter,
    }),
    [urlSearch, statusFilter, severityFilter]
  );

  const shouldSyncUrl = useMemo(() => {
    const currentParams = {
      q: getFirstParam(params.q) || DEFAULTS.q,
      status: getFirstParam(params.status) || DEFAULTS.status,
      severity: getFirstParam(params.severity) || DEFAULTS.severity,
    };

    return Object.entries(urlParams).some(
      ([key, value]) => currentParams[key as keyof typeof currentParams] !== value
    );
  }, [urlParams, params.q, params.status, params.severity]);

  const [localSearch, setLocalSearch] = useState(urlSearch);

  const updateParams = useCallback(
    (newParams: Record<string, string | number | undefined>) => {
      const nextParams = { ...urlParams, ...newParams };

      const cleanParams: Record<string, string | undefined> = {};
      Object.entries(nextParams).forEach(([key, value]) => {
        const stringValue = String(value);
        cleanParams[key] =
          stringValue === DEFAULTS[key as keyof typeof DEFAULTS] ? undefined : stringValue;
      });

      // Remove desktop-specific page param if it exists in the route
      if ('page' in params) {
        cleanParams.page = undefined;
      }

      setRouteParams(cleanParams);
    },
    [urlParams, params]
  );

  useEffect(() => {
    if (!shouldSyncUrl) return;

    const timeoutId = setTimeout(() => {
      const cleanParams: Record<string, string | undefined> = {};
      Object.entries(urlParams).forEach(([key, value]) => {
        cleanParams[key] = value === DEFAULTS[key as keyof typeof DEFAULTS] ? undefined : value;
      });
      // Clear page param from mobile view
      if ('page' in params) {
        cleanParams.page = undefined;
      }
      setRouteParams(cleanParams);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [shouldSyncUrl, urlParams, params]);

  useEffect(() => {
    setLocalSearch(urlSearch);
  }, [urlSearch]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (localSearch !== urlSearch) {
        updateParams({ q: localSearch });
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timeoutId);
  }, [localSearch, urlSearch, updateParams]);

  const query = useInfiniteQuery({
    queryKey: ['incidents', 'infinite', statusFilter, severityFilter, urlSearch],
    queryFn: ({ pageParam = 1 }) =>
      fetchIncidents({
        page: pageParam,
        limit: DEFAULT_LIMIT,
        status: statusFilter,
        severity: severityFilter,
        q: urlSearch,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
  });

  const setSearch = useCallback((value: string) => {
    setLocalSearch(value);
  }, []);

  const setStatusFilter = useCallback(
    (value: string) => {
      updateParams({ status: value });
    },
    [updateParams]
  );

  const setSeverityFilter = useCallback(
    (value: string) => {
      updateParams({ severity: value });
    },
    [updateParams]
  );

  const incidents = useMemo(
    () => query.data?.pages.flatMap((page) => page.items) ?? [],
    [query.data?.pages]
  );

  const total = useMemo(() => query.data?.pages[0]?.total ?? 0, [query.data?.pages]);

  const loading = query.isLoading;
  const isFetchingNextPage = query.isFetchingNextPage;
  const error = query.isError
    ? query.error instanceof Error
      ? query.error.message
      : 'Failed to load incidents.'
    : null;

  return useMemo(
    () => ({
      incidents,
      total,
      search: localSearch,
      setSearch,
      statusFilter,
      setStatusFilter,
      severityFilter,
      setSeverityFilter,
      loading,
      error,
      hasNextPage: query.hasNextPage,
      fetchNextPage: query.fetchNextPage,
      isFetchingNextPage,
      refetch: query.refetch,
      isRefetching: query.isRefetching,
    }),
    [
      incidents,
      total,
      localSearch,
      statusFilter,
      severityFilter,
      loading,
      error,
      query.hasNextPage,
      query.fetchNextPage,
      isFetchingNextPage,
      query.refetch,
      query.isRefetching,
      setSearch,
      setStatusFilter,
      setSeverityFilter,
    ]
  );
}
