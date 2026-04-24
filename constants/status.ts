import { ThreatLevel, IncidentStatus } from '../types';

export const THREAT_LEVELS: Record<ThreatLevel, ThreatLevel> = {
  CRITICAL: 'CRITICAL',
  WARNING: 'WARNING',
  NORMAL: 'NORMAL',
};

export const INCIDENT_STATUS: Record<IncidentStatus, IncidentStatus> = {
  PENDING: 'PENDING',
  UNDER_INVESTIGATION: 'UNDER_INVESTIGATION',
  RESOLVED: 'RESOLVED',
  CONTAINED: 'CONTAINED',
  DISMISSED: 'DISMISSED',
};

export const SEVERITY_COLORS = {
  CRITICAL: '#fb565b',
  WARNING: '#ffba00',
  NORMAL: '#00d992',
};
