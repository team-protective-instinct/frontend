import { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Modal,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Playbook } from '../../types';
import { useIsDesktop } from '../../hooks/useIsDesktop';
import { useSlideIn } from '../../hooks/useAnimation';

interface PlaybookPreviewPanelProps {
  playbook: Playbook | null;
  onClose: () => void;
  visible: boolean;
}

export function PlaybookPreviewPanel({ playbook, onClose, visible }: PlaybookPreviewPanelProps) {
  const isDesktop = useIsDesktop();
  const { slideAnim, slide } = useSlideIn(Dimensions.get('window').width, 0, 300);

  useEffect(() => {
    if (visible && isDesktop) {
      slide(0);
    } else {
      slide(Dimensions.get('window').width);
    }
  }, [visible, isDesktop]);

  if (!playbook) return null;

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <View className="flex-1 flex-row justify-end bg-black/60">
        <TouchableOpacity className="flex-1" onPress={onClose} activeOpacity={1} />
        <Animated.View
          style={{
            width: isDesktop ? 600 : '100%',
            transform: [{ translateX: slideAnim }],
            boxShadow: '-15px 0 40px rgba(0,0,0,0.6)',
          }}
          className="h-full border-l border-[#3d3a39] bg-[#101010]">
          <View className="flex-row items-center justify-between border-b border-[#3d3a39] bg-[#050507] px-6 py-5">
            <View>
              <Text className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#8b949e]">
                {playbook.fileType} Document
              </Text>
              <Text className="text-lg font-black text-[#f2f2f2]">{playbook.fileName}</Text>
            </View>
            <TouchableOpacity onPress={onClose} className="rounded-full bg-[#3d3a39]/20 p-2">
              <Ionicons name="close" size={24} color="#8b949e" />
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1 p-8">
            <View className="shadow-inner min-h-[500px] rounded-2xl border border-[#3d3a39] bg-[#050507] p-8">
              <Text className="text-sm leading-7 text-[#b8b3b0]">
                {/* Mock Content */}
                <Text className="mb-6 text-xl font-black text-[#f2f2f2]">
                  Standard Operating Procedure: {playbook.fileName.split('.')[0]}
                </Text>
                {'\n\n'}
                This document provides the standard AI-driven response procedure for relevant
                security incidents.
                {'\n\n'}
                <Text className="font-bold text-[#00d992]">1. Detection & Identification</Text>
                {'\n'}
                The AI Agent utilizes high-confidence signatures from this playbook to identify
                lateral movement and unauthorized access attempts.
                {'\n\n'}
                <Text className="font-bold text-[#00d992]">2. Containment Strategy</Text>
                {'\n'}
                Upon confirmation, the recommended actions include immediate IP blocking and process
                termination based on the parameters defined in Section 4.
                {'\n\n'}
                <Text className="font-bold text-[#b8b3b0]">3. Recovery & Post-Incident</Text>
                {'\n'}
                Review logs and update the Vector DB with any new indicators of compromise (IoC)
                found during the analysis.
              </Text>
            </View>
          </ScrollView>

          <View className="border-t border-[#3d3a39] bg-[#050507] p-6">
            <TouchableOpacity className="w-full items-center rounded-2xl bg-[#00d992] py-4 shadow-[0_0_15px_rgba(0,217,146,0.3)]">
              <Text className="text-sm font-black uppercase text-[#050507]">
                Re-Vectorize Document
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
