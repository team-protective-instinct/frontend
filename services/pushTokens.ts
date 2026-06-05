export type PushTokenPlatform = 'ios' | 'android' | 'web' | 'unknown';

export interface PushTokenRegisterRequest {
  token: string;
  provider: 'expo';
  platform: PushTokenPlatform;
  device_name?: string;
}

export interface PushTokenResponse {
  idx: number;
  token: string;
  provider: string;
  platform: string;
  device_name: string | null;
  is_active: boolean;
  created_at: string;
  modified_at: string;
}

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';

export async function registerPushToken(
  request: PushTokenRegisterRequest
): Promise<PushTokenResponse> {
  const response = await fetch(`${API_BASE_URL}/push-tokens`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Failed to register push token: ${response.status}`);
  }

  return response.json() as Promise<PushTokenResponse>;
}
