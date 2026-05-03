import type { OverviewSummary } from '../types';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';

export async function fetchOverviewSummary(): Promise<OverviewSummary> {
  const response = await fetch(`${API_BASE_URL}/incidents/summary`);

  if (!response.ok) {
    throw new Error(`Failed to fetch overview summary: ${response.status}`);
  }

  return response.json() as Promise<OverviewSummary>;
}