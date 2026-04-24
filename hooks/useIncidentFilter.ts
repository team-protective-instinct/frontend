import { useState, useMemo } from 'react';
import { Incident } from '../types';

/**
 * 사건 목록 필터링 및 검색 로직을 담당하는 커스텀 훅
 */
export function useIncidentFilter(initialIncidents: Incident[]) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [severityFilter, setSeverityFilter] = useState('ALL');

  const filteredIncidents = useMemo(() => {
    return initialIncidents.filter((i) => {
      const matchSearch =
        i.attack_type.toLowerCase().includes(search.toLowerCase()) ||
        i.id.toLowerCase().includes(search.toLowerCase()) ||
        i.targetIp.includes(search);
      
      const matchStatus = statusFilter === 'ALL' || i.status === statusFilter;
      const matchSeverity = severityFilter === 'ALL' || i.threatLevel === severityFilter;
      
      return matchSearch && matchStatus && matchSeverity;
    });
  }, [initialIncidents, search, statusFilter, severityFilter]);

  return {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    severityFilter,
    setSeverityFilter,
    filteredIncidents,
  };
}
