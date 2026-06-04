import type { ResponsePlan } from '../types';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';

export async function approveResponsePlan(responsePlanIdx: number): Promise<ResponsePlan> {
  const response = await fetch(`${API_BASE_URL}/response-plans/${responsePlanIdx}/approve`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error(`Failed to approve response plan: ${response.status}`);
  }

  return response.json() as Promise<ResponsePlan>;
}

export async function denyResponsePlan(
  responsePlanIdx: number,
  deniedReason: string
): Promise<ResponsePlan> {
  const response = await fetch(`${API_BASE_URL}/response-plans/${responsePlanIdx}/deny`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ denied_reason: deniedReason }),
  });

  if (!response.ok) {
    throw new Error(`Failed to deny response plan: ${response.status}`);
  }

  return response.json() as Promise<ResponsePlan>;
}
