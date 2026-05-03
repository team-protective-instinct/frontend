import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { useLocalSearchParams, router } from 'expo-router';

import { fetchIncidents } from '../services/incidents';
import type { IncidentStatus, SeverityLevel } from '../types';

const DEFAULT_LIMIT = 20;
const SEARCH_DEBOUNCE_MS = 300;

const DEFAULTS = {
  page: '1',
  limit: String(DEFAULT_LIMIT),
  q: '',
  status: 'ALL',
  severity: 'ALL',
};

function getFirstParam(param: string | string[] | undefined): string | undefined {
  if (Array.isArray(param)) return param[0];
  return param;
}

function parsePage(param: string | string[] | undefined): number {
  const val = getFirstParam(param);
  if (!val) return Number(DEFAULTS.page);
  const parsed = Number(val);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : Number(DEFAULTS.page);
}

function parseLimit(param: string | string[] | undefined): number {
  const val = getFirstParam(param);
  if (!val) return Number(DEFAULTS.limit);
  const parsed = Number(val);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : Number(DEFAULTS.limit);
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

export function useIncidents() {
  const params = useLocalSearchParams();

  const page = parsePage(params.page);
  const limit = parseLimit(params.limit);
  const urlSearch = parseQuery(params.q);
  const statusFilter = parseStatus(params.status);
  const severityFilter = parseSeverity(params.severity);

  const urlParams = useMemo(
    () => ({
      page: String(page),
      limit: String(limit),
      q: urlSearch,
      status: statusFilter,
      severity: severityFilter,
    }),
    [page, limit, urlSearch, statusFilter, severityFilter]
  );

  const shouldSyncUrl = useMemo(() => {
    const currentParams = {
      page: getFirstParam(params.page) || DEFAULTS.page,
      limit: getFirstParam(params.limit) || DEFAULTS.limit,
      q: getFirstParam(params.q) || DEFAULTS.q,
      status: getFirstParam(params.status) || DEFAULTS.status,
      severity: getFirstParam(params.severity) || DEFAULTS.severity,
    };

    return Object.entries(urlParams).some(
      ([key, value]) => currentParams[key as keyof typeof currentParams] !== value
    );
  }, [urlParams, params.page, params.limit, params.q, params.status, params.severity]);

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

      setRouteParams(cleanParams);
    },
    [urlParams]
  );

  useEffect(() => {
    if (!shouldSyncUrl) return;

    const timeoutId = setTimeout(() => {
      const cleanParams: Record<string, string | undefined> = {};
      Object.entries(urlParams).forEach(([key, value]) => {
        cleanParams[key] = value === DEFAULTS[key as keyof typeof DEFAULTS] ? undefined : value;
      });
      setRouteParams(cleanParams);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [shouldSyncUrl, urlParams]);

  useEffect(() => {
    setLocalSearch(urlSearch);
  }, [urlSearch]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (localSearch !== urlSearch) {
        updateParams({ q: localSearch, page: 1 });
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timeoutId);
  }, [localSearch, urlSearch, updateParams]);

  const query = useQuery({
    queryKey: ['incidents', page, limit, statusFilter, severityFilter, urlSearch],
    queryFn: () =>
      fetchIncidents({
        page,
        limit,
        status: statusFilter,
        severity: severityFilter,
        q: urlSearch,
      }),
    placeholderData: keepPreviousData,
  });

  const setSearch = useCallback((value: string) => {
    setLocalSearch(value);
  }, []);

  const setStatusFilter = useCallback(
    (value: string) => {
      updateParams({ status: value, page: 1 });
    },
    [updateParams]
  );

  const setSeverityFilter = useCallback(
    (value: string) => {
      updateParams({ severity: value, page: 1 });
    },
    [updateParams]
  );

  const canGoPrevious = page > 1;
  const incidents = useMemo(() => query.data?.items ?? [], [query.data?.items]);
  const total = query.data?.total ?? 0;
  const totalPages = query.data?.total_pages ?? 0;
  const loading = query.isLoading;
  const error = query.isError
    ? query.error instanceof Error
      ? query.error.message
      : 'Failed to load incidents.'
    : null;
  const canGoNext = totalPages > 0 && page < totalPages;

  return useMemo(
    () => ({
      incidents,
      page,
      limit,
      total,
      totalPages,
      search: localSearch,
      setSearch,
      statusFilter,
      setStatusFilter,
      severityFilter,
      setSeverityFilter,
      loading,
      error,
      canGoPrevious,
      canGoNext,
      goPrevious: () => {
        if (canGoPrevious) {
          updateParams({ page: page - 1 });
        }
      },
      goNext: () => {
        if (canGoNext) {
          updateParams({ page: page + 1 });
        }
      },
    }),
    [
      incidents,
      page,
      limit,
      total,
      totalPages,
      localSearch,
      statusFilter,
      severityFilter,
      loading,
      error,
      canGoPrevious,
      canGoNext,
      setSearch,
      setStatusFilter,
      setSeverityFilter,
      updateParams,
    ]
  );
}
