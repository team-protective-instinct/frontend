import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import '../global.css';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { usePushNotificationListeners } from '../hooks/usePushNotificationListeners';
import { useRegisterPushTokenOnStartup } from '../hooks/useRegisterPushTokenOnStartup';

const queryClient = new QueryClient();

function PushNotificationBootstrap() {
  useRegisterPushTokenOnStartup();
  usePushNotificationListeners(queryClient);
  return null;
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <PushNotificationBootstrap />
      <SafeAreaProvider>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#050507' } }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
