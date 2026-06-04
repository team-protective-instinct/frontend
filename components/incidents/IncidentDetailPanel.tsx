import { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Animated as RNAnimated,
  Modal,
  Dimensions,
  Text,
  ActivityIndicator,
} from 'react-native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchIncidentDetail } from '../../services/incidents';
import { approveResponsePlan, denyResponsePlan } from '../../services/responsePlans';
import type { IncidentDetail } from '../../types';
import { useIsDesktop } from '../../hooks/useIsDesktop';
import { useSlideIn } from '../../hooks/useAnimation';

import { DetailHeader } from './detail/DetailHeader';
import { ThreatIntelligence } from './detail/ThreatIntelligence';
import { AnalysisSummary } from './detail/AnalysisSummary';
import { ResponsePlanSection } from './detail/ResponsePlanSection';
import { AnalysisSection } from './detail/AnalysisSection';
import { EvidenceLog } from './detail/EvidenceLog';
import { DetailActionButtons } from './detail/DetailActionButtons';
import { QuickInfoCards } from './detail/QuickInfoCards';

interface IncidentDetailPanelProps {
  incidentIdx: number | null;
  preloadedIncident?: IncidentDetail | null;
  onClose: () => void;
  visible: boolean;
  presentation?: 'modal' | 'screen';
}

export function IncidentDetailPanel({
  incidentIdx,
  preloadedIncident,
  onClose,
  visible,
  presentation = 'modal',
}: IncidentDetailPanelProps) {
  const isDesktop = useIsDesktop();
  const [logModalVisible, setLogModalVisible] = useState(false);
  const { slideAnim, slide } = useSlideIn(Dimensions.get('window').width, 0, 300);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['incident', incidentIdx],
    queryFn: () => fetchIncidentDetail(incidentIdx!),
    enabled: visible && incidentIdx !== null && !preloadedIncident,
  });

  const approveMutation = useMutation({
    mutationFn: approveResponsePlan,
    onSuccess: async () => {
      if (incidentIdx !== null) {
        await queryClient.invalidateQueries({ queryKey: ['incident', incidentIdx] });
        await refetch();
      }
    },
  });

  const denyMutation = useMutation({
    mutationFn: ({ responsePlanIdx, reason }: { responsePlanIdx: number; reason: string }) =>
      denyResponsePlan(responsePlanIdx, reason),
    onSuccess: async () => {
      if (incidentIdx !== null) {
        await queryClient.invalidateQueries({ queryKey: ['incident', incidentIdx] });
        await refetch();
      }
    },
  });

  const incident = preloadedIncident ?? data;

  useEffect(() => {
    if (visible && isDesktop) {
      slide(0);
    } else {
      slide(Dimensions.get('window').width);
    }
  }, [visible, isDesktop, slide]);

  if (!visible) return null;

  let content;

  if (isLoading && !preloadedIncident) {
    content = (
      <View className="flex-1 items-center justify-center bg-[#101010]">
        <ActivityIndicator size="large" color="#00d992" />
        <Text className="mt-4 text-white">Loading...</Text>
      </View>
    );
  } else if (isError) {
    content = (
      <View className="flex-1 items-center justify-center bg-[#101010]">
        <Text className="mb-4 text-white">Failed to load incident detail.</Text>
        <TouchableOpacity onPress={onClose} className="rounded bg-[#3d3a39] px-4 py-2">
          <Text className="text-white">Close</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (!incident) {
    content = null;
  } else {
    content = (
      <View className="flex-1 bg-[#101010]">
        <DetailHeader incident={incident} onClose={onClose} />

        <ScrollView className="flex-1 p-6" contentContainerStyle={{ paddingBottom: 140 }}>
          <QuickInfoCards incident={incident} />
          <AnalysisSummary summary={incident.analysis_summary} />
          <ThreatIntelligence incident={incident} />
          <AnalysisSection incident={incident} />
          <EvidenceLog
            rawLogs={incident.raw_logs}
            isDesktop={isDesktop}
            logModalVisible={logModalVisible}
            setLogModalVisible={setLogModalVisible}
          />
          <ResponsePlanSection responsePlan={incident.response_plan} />
        </ScrollView>

        <DetailActionButtons
          incident={incident}
          isDesktop={isDesktop}
          onApprove={() => {
            if (incident.response_plan) {
              approveMutation.mutate(incident.response_plan.idx);
            }
          }}
          onDeny={(reason) => {
            if (incident.response_plan) {
              denyMutation.mutate({ responsePlanIdx: incident.response_plan.idx, reason });
            }
          }}
          isSubmitting={approveMutation.isPending || denyMutation.isPending}
          errorMessage={
            approveMutation.error instanceof Error
              ? approveMutation.error.message
              : denyMutation.error instanceof Error
                ? denyMutation.error.message
                : null
          }
        />
      </View>
    );
  }

  if (!content) return null;

  if (presentation === 'screen') {
    return content;
  }

  if (isDesktop) {
    return (
      <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
        <View className="flex-1 flex-row justify-end bg-black/60">
          <TouchableOpacity className="flex-1" onPress={onClose} activeOpacity={1} />
          <RNAnimated.View
            style={{
              width: 800,
              transform: [{ translateX: slideAnim }],
              boxShadow: '-15px 0 40px rgba(0,0,0,0.6)',
            }}
            className="h-full border-l border-[#3d3a39]">
            {content}
          </RNAnimated.View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      {content}
    </Modal>
  );
}
