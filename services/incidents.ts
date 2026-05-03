import type { IncidentDetail, IncidentListResponse, IncidentQueryParams } from '../types';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';

export async function fetchIncidents(
  params: IncidentQueryParams = {}
): Promise<IncidentListResponse> {
  const searchParams = new URLSearchParams();

  searchParams.set('page', String(params.page ?? 1));
  searchParams.set('limit', String(params.limit ?? 20));

  if (params.status && params.status !== 'ALL') {
    searchParams.set('status', params.status);
  }

  if (params.severity && params.severity !== 'ALL') {
    searchParams.set('severity', params.severity);
  }

  const query = params.q?.trim();
  if (query) {
    searchParams.set('q', query);
  }

  const response = await fetch(`${API_BASE_URL}/incidents?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch incidents: ${response.status}`);
  }

  return response.json() as Promise<IncidentListResponse>;
}

export async function fetchIncidentDetail(incidentIdx: number): Promise<IncidentDetail> {
  const response = await fetch(`${API_BASE_URL}/incidents/${incidentIdx}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch incident detail: ${response.status}`);
  }

  return response.json() as Promise<IncidentDetail>;
}
