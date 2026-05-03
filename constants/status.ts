import { SeverityLevel, IncidentStatus } from '../types';

export const SEVERITY_LEVELS: Record<SeverityLevel, SeverityLevel> = {
  critical: 'critical',
  high: 'high',
  medium: 'medium',
  low: 'low',
};

export const INCIDENT_STATUS: Record<IncidentStatus, IncidentStatus> = {
  analyzing: 'analyzing',
  pending_review: 'pending_review',
  resolved: 'resolved',
  dismissed: 'dismissed',
};

export const SEVERITY_COLORS = {
  critical: '#fb565b',
  high: '#fb565b',
  medium: '#ffba00',
  low: '#00d992',
};
