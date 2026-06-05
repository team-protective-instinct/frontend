import { useEffect } from 'react';
import { Platform } from 'react-native';

import { requestExpoPushToken } from '../services/pushNotifications';
import { registerPushToken, type PushTokenPlatform } from '../services/pushTokens';

let hasAttemptedPushTokenRegistration = false;

export function useRegisterPushTokenOnStartup() {
  useEffect(() => {
    if (hasAttemptedPushTokenRegistration) return;
    hasAttemptedPushTokenRegistration = true;

    async function registerStartupPushToken() {
      const tokenResult = await requestExpoPushToken();
      if (tokenResult.status !== 'granted') {
        return;
      }

      try {
        await registerPushToken({
          token: tokenResult.token,
          provider: 'expo',
          platform: getPushTokenPlatform(),
        });
      } catch (error) {
        console.warn(
          error instanceof Error ? error.message : 'Failed to register push token with backend.'
        );
      }
    }

    void registerStartupPushToken();
  }, []);
}

function getPushTokenPlatform(): PushTokenPlatform {
  if (Platform.OS === 'ios' || Platform.OS === 'android' || Platform.OS === 'web') {
    return Platform.OS;
  }

  return 'unknown';
}
