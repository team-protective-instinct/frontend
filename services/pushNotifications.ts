import Constants from 'expo-constants';
import { Platform } from 'react-native';

type ExpoNotificationsModule = typeof import('expo-notifications');

const DEFAULT_NOTIFICATION_CHANNEL_ID = 'default';

export type ExpoPushTokenResult =
  | {
      status: 'granted';
      token: string;
    }
  | {
      status: 'denied' | 'unavailable' | 'error';
      message: string;
    };

export async function configurePushNotificationChannel(): Promise<void> {
  if (Platform.OS !== 'android') return;

  const Notifications = await loadExpoNotifications();

  await Notifications.setNotificationChannelAsync(DEFAULT_NOTIFICATION_CHANNEL_ID, {
    name: 'Default',
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#00d992',
  });
}

export async function requestExpoPushToken(): Promise<ExpoPushTokenResult> {
  if (Platform.OS === 'web') {
    return {
      status: 'unavailable',
      message: 'Push notifications are only configured for native mobile builds.',
    };
  }

  if (isAndroidExpoGo()) {
    return {
      status: 'unavailable',
      message: 'Remote push notifications are unavailable in Android Expo Go.',
    };
  }

  try {
    // 동적으로 expo-notifications 패키지를 import 함
    const Notifications = await loadExpoNotifications();
    await configurePushNotificationChannel();

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return {
        status: 'denied',
        message: 'Notification permission was not granted.',
      };
    }

    const projectId = getExpoProjectId();
    if (!projectId) {
      return {
        status: 'unavailable',
        message: 'Expo project ID is not configured for push token registration.',
      };
    }

    const token = await Notifications.getExpoPushTokenAsync({ projectId });
    return {
      status: 'granted',
      token: token.data,
    };
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to request Expo push token.',
    };
  }
}

async function loadExpoNotifications(): Promise<ExpoNotificationsModule> {
  return import('expo-notifications');
}

function isAndroidExpoGo(): boolean {
  return Platform.OS === 'android' && Constants.appOwnership === 'expo';
}

function getExpoProjectId(): string | undefined {
  const easProjectId = Constants.easConfig?.projectId;
  if (typeof easProjectId === 'string' && easProjectId.length > 0) {
    return easProjectId;
  }

  const easConfig = Constants.expoConfig?.extra?.eas;
  if (!easConfig || typeof easConfig !== 'object') {
    return undefined;
  }

  const projectId = easConfig.projectId;
  return typeof projectId === 'string' && projectId.length > 0 ? projectId : undefined;
}
