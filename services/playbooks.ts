import type { PlaybookDetail, PlaybookListItem } from '../types';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';

export async function fetchPlaybooks(): Promise<PlaybookListItem[]> {
  const response = await fetch(`${API_BASE_URL}/playbooks`);

  if (!response.ok) {
    throw new Error(`Failed to fetch playbooks: ${response.status}`);
  }

  return response.json() as Promise<PlaybookListItem[]>;
}

export async function fetchPlaybookDetail(playbookIdx: number): Promise<PlaybookDetail> {
  const response = await fetch(`${API_BASE_URL}/playbooks/${playbookIdx}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch playbook detail: ${response.status}`);
  }

  return response.json() as Promise<PlaybookDetail>;
}
