import { useLocalSearchParams, router } from 'expo-router';
import { View } from 'react-native';
import { IncidentDetailPanel } from '../../../components/incidents/IncidentDetailPanel';
import IncidentsScreen from './index';

function getFirstParam(param: string | string[] | undefined): string | undefined {
  if (Array.isArray(param)) return param[0];
  return param;
}

export default function IncidentDetailScreen() {
  const params = useLocalSearchParams();
  const incidentIdxParam = getFirstParam(params.incident_idx);
  const parsedIncidentIdx = incidentIdxParam ? Number(incidentIdxParam) : null;
  const incidentIdx = Number.isInteger(parsedIncidentIdx) ? parsedIncidentIdx : null;

  const handleClose = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      const { incident_idx, ...restParams } = params;
      router.replace({ pathname: '/incidents', params: restParams });
    }
  };

  return (
    <View className="flex-1 bg-bg-primary">
      <IncidentsScreen />
      <IncidentDetailPanel visible={true} incidentIdx={incidentIdx} onClose={handleClose} />
    </View>
  );
}
