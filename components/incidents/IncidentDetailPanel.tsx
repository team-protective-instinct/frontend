import { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Animated as RNAnimated, Modal, Dimensions, Text } from 'react-native';
import { Incident } from '../../types';
import { useIsDesktop } from '../../hooks/useIsDesktop';
import { useSlideIn } from '../../hooks/useAnimation';

import { DetailHeader } from './detail/DetailHeader';
import { ThreatIntelligence } from './detail/ThreatIntelligence';
import { ExecutiveSummary } from './detail/ExecutiveSummary';
import { AnalysisSection } from './detail/AnalysisSection';
import { EvidenceLog } from './detail/EvidenceLog';
import { ResponsePlan } from './detail/ResponsePlan';
import { DetailActionButtons } from './detail/DetailActionButtons';
import { StatusBadge, ThreatBadge } from '../common/StatusBadge';

interface IncidentDetailPanelProps {
  incident: Incident | null;
  onClose: () => void;
  visible: boolean;
}

export function IncidentDetailPanel({ incident, onClose, visible }: IncidentDetailPanelProps) {
  const isDesktop = useIsDesktop();
  const [logModalVisible, setLogModalVisible] = useState(false);
  const { slideAnim, slide } = useSlideIn(Dimensions.get('window').width, 0, 300);

  useEffect(() => {
    if (visible && isDesktop) {
      slide(0);
    } else {
      slide(Dimensions.get('window').width);
    }
  }, [visible, isDesktop]);

  if (!incident) return null;

  const content = (
    <View className="flex-1 bg-[#101010]">
      <DetailHeader incident={incident} onClose={onClose} />

      <ScrollView className="flex-1 p-6" contentContainerStyle={{ paddingBottom: 140 }}>
        {/* Quick Info */}
        <View className="flex-row items-center mb-8 gap-3">
          <StatusBadge status={incident.status} />
          <ThreatBadge level={incident.threatLevel} />
          <View className="bg-[#00d992]/10 px-2 py-1 rounded border border-[#00d992]/20">
             <Text className="text-[10px] font-bold text-[#00d992]">CONFIDENCE: {(incident.confidence_score * 100).toFixed(0)}%</Text>
          </View>
        </View>

        <ThreatIntelligence incident={incident} />
        <ExecutiveSummary summary={incident.executive_summary} />
        <AnalysisSection incident={incident} />
        <EvidenceLog 
          rawLog={incident.raw_log} 
          isDesktop={isDesktop} 
          logModalVisible={logModalVisible} 
          setLogModalVisible={setLogModalVisible} 
        />
        <ResponsePlan incident={incident} />
      </ScrollView>

      <DetailActionButtons incident={incident} isDesktop={isDesktop} onClose={onClose} />
    </View>
  );

  if (isDesktop) {
    return (
      <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
        <View className="flex-1 flex-row justify-end bg-black/60">
          <TouchableOpacity className="flex-1" onPress={onClose} activeOpacity={1} />
          <RNAnimated.View 
            style={{ 
              width: 800, 
              transform: [{ translateX: slideAnim }],
              boxShadow: '-15px 0 40px rgba(0,0,0,0.6)'
            }} 
            className="h-full border-l border-[#3d3a39]"
          >
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
