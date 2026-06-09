import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsDesktop } from '../../../hooks/useIsDesktop';
import { DesktopIncidentsList } from '../../../components/incidents/DesktopIncidentsList';
import { MobileIncidentsList } from '../../../components/incidents/MobileIncidentsList';

export default function IncidentsScreen() {
  const isDesktop = useIsDesktop();

  return (
    <SafeAreaView className="flex-1 bg-bg-primary" edges={isDesktop ? [] : ['bottom']}>
      {isDesktop ? <DesktopIncidentsList /> : <MobileIncidentsList />}
    </SafeAreaView>
  );
}
