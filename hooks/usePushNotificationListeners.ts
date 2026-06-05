import type { QueryClient } from '@tanstack/react-query';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Platform } from 'react-native';

type ExpoNotificationsModule = typeof import('expo-notifications');
type NotificationResponse = Parameters<
  Parameters<ExpoNotificationsModule['addNotificationResponseReceivedListener']>[0]
>[0];

export function usePushNotificationListeners(queryClient: QueryClient) {
  useEffect(() => {
    if (Platform.OS === 'web' || isAndroidExpoGo()) return;

    let isMounted = true;
    let cleanup: (() => void) | undefined;

    async function registerListeners() {
      const Notifications = await loadExpoNotifications();
      if (!isMounted) return;

      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowBanner: true,
          shouldShowList: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });

      const receivedSubscription = Notifications.addNotificationReceivedListener(() => {
        void invalidateSecurityQueries(queryClient);
      });

      const responseSubscription = Notifications.addNotificationResponseReceivedListener(
        (response) => {
          void handleNotificationResponse(response, queryClient);
        }
      );

      const lastResponse = Notifications.getLastNotificationResponse();
      if (lastResponse) {
        void handleNotificationResponse(lastResponse, queryClient);
      }

      cleanup = () => {
        receivedSubscription.remove();
        responseSubscription.remove();
      };
    }

    void registerListeners();

    return () => {
      isMounted = false;
      cleanup?.();
    };
  }, [queryClient]);
}

async function handleNotificationResponse(
  response: NotificationResponse,
  queryClient: QueryClient
) {
  const data = response.notification.request.content.data;
  const incidentIdx =
    typeof data.incident_idx === 'string' && data.incident_idx.length > 0
      ? data.incident_idx
      : undefined;

  await invalidateSecurityQueries(queryClient, incidentIdx);

  if (!incidentIdx) return;

  router.push({
    pathname: '/incidents/[incident_idx]',
    params: { incident_idx: incidentIdx },
  });
}

async function invalidateSecurityQueries(queryClient: QueryClient, incidentIdx?: string) {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: ['incidents'] }),
    queryClient.invalidateQueries({ queryKey: ['overview'] }),
    incidentIdx
      ? queryClient.invalidateQueries({ queryKey: ['incident', Number(incidentIdx)] })
      : Promise.resolve(),
  ]);
}

async function loadExpoNotifications(): Promise<ExpoNotificationsModule> {
  return import('expo-notifications');
}

function isAndroidExpoGo(): boolean {
  return (
    Platform.OS === 'android' && Constants.executionEnvironment === ExecutionEnvironment.StoreClient
  );
}
