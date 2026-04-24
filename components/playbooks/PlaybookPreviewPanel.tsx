import { useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated, Modal, Dimensions } from 'react-native';
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
            boxShadow: '-15px 0 40px rgba(0,0,0,0.6)'
          }} 
          className="h-full bg-[#101010] border-l border-[#3d3a39]"
        >
          <View className="px-6 py-5 border-b border-[#3d3a39] flex-row justify-between items-center bg-[#050507]">
            <View>
              <Text className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest mb-1">{playbook.fileType} Document</Text>
              <Text className="text-lg font-black text-[#f2f2f2]">{playbook.fileName}</Text>
            </View>
            <TouchableOpacity onPress={onClose} className="p-2 rounded-full bg-[#3d3a39]/20">
              <Ionicons name="close" size={24} color="#8b949e" />
            </TouchableOpacity>
          </View>
          
          <ScrollView className="flex-1 p-8">
            <View className="bg-[#050507] p-8 rounded-2xl border border-[#3d3a39] shadow-inner min-h-[500px]">
              <Text className="text-sm leading-7 text-[#b8b3b0]">
                {/* Mock Content */}
                <Text className="text-xl font-black text-[#f2f2f2] mb-6">Standard Operating Procedure: {playbook.fileName.split('.')[0]}</Text>
                {"\n\n"}
                This document provides the standard AI-driven response procedure for relevant security incidents. 
                {"\n\n"}
                <Text className="font-bold text-[#00d992]">1. Detection & Identification</Text>{"\n"}
                The AI Agent utilizes high-confidence signatures from this playbook to identify lateral movement and unauthorized access attempts.
                {"\n\n"}
                <Text className="font-bold text-[#00d992]">2. Containment Strategy</Text>{"\n"}
                Upon confirmation, the recommended actions include immediate IP blocking and process termination based on the parameters defined in Section 4.
                {"\n\n"}
                <Text className="font-bold text-[#b8b3b0]">3. Recovery & Post-Incident</Text>{"\n"}
                Review logs and update the Vector DB with any new indicators of compromise (IoC) found during the analysis.
              </Text>
            </View>
          </ScrollView>
          
          <View className="p-6 border-t border-[#3d3a39] bg-[#050507]">
            <TouchableOpacity className="w-full bg-[#00d992] py-4 rounded-2xl items-center shadow-[0_0_15px_rgba(0,217,146,0.3)]">
              <Text className="text-sm font-black text-[#050507] uppercase">Re-Vectorize Document</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
