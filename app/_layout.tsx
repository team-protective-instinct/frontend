import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import '../global.css';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#0F172A' } }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="action/[id]"
          options={{
            headerShown: true,
            headerTitle: 'Action Center',
            headerStyle: { backgroundColor: '#1E293B' },
            headerTintColor: '#F1F5F9',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
        <Stack.Screen
          name="report/[id]"
          options={{
            headerShown: true,
            headerTitle: 'Incident Report',
            headerStyle: { backgroundColor: '#1E293B' },
            headerTintColor: '#F1F5F9',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
      </Stack>
    </>
  );
}
