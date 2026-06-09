import { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Modal,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import type { PlaybookListItem } from '../../types';
import { fetchPlaybookDetail } from '../../services/playbooks';
import { useIsDesktop } from '../../hooks/useIsDesktop';
import { useSlideIn } from '../../hooks/useAnimation';
import { SafeAreaView } from 'react-native-safe-area-context';

interface PlaybookPreviewPanelProps {
  playbook: PlaybookListItem | null;
  onClose: () => void;
  visible: boolean;
}

export function PlaybookPreviewPanel({ playbook, onClose, visible }: PlaybookPreviewPanelProps) {
  const isDesktop = useIsDesktop();
  const { slideAnim, slide } = useSlideIn(Dimensions.get('window').width, 0, 300);
  const playbookIdx = playbook?.idx;
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['playbook', playbookIdx],
    queryFn: () => {
      if (playbookIdx === undefined) {
        throw new Error('Missing playbook index.');
      }
      return fetchPlaybookDetail(playbookIdx);
    },
    enabled: visible && playbookIdx !== undefined,
  });

  useEffect(() => {
    if (visible && isDesktop) {
      slide(0);
    } else {
      slide(Dimensions.get('window').width);
    }
  }, [visible, isDesktop, slide]);

  if (!playbook) return null;

  const detail = data;
  const errorMessage = error instanceof Error ? error.message : 'Failed to load playbook detail.';

  const content = (
    <View className="flex-1 bg-[#101010]">
      <View className="flex-row items-center justify-between border-b border-[#3d3a39] bg-[#050507] px-6 py-5">
        <View className="mr-4 flex-1">
          <Text className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#8b949e]">
            {playbook.tactic} Playbook
          </Text>
          <Text className="text-lg font-black text-[#f2f2f2]">{playbook.title}</Text>
          <Text className="mt-1 text-[10px] text-[#8b949e]">{playbook.source_file}</Text>
        </View>
        <TouchableOpacity onPress={onClose} className="rounded-full bg-[#3d3a39]/20 p-2">
          <Ionicons name="close" size={24} color="#8b949e" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 bg-[#101010] p-8">
        {isLoading && (
          <View className="min-h-[300px] items-center justify-center rounded-2xl border border-[#3d3a39] bg-[#050507] p-8">
            <ActivityIndicator size="large" color="#00d992" />
            <Text className="mt-4 text-sm font-bold text-[#b8b3b0]">Loading playbook...</Text>
          </View>
        )}

        {isError && (
          <View className="rounded-2xl border border-[#fb565b]/40 bg-[#fb565b]/10 p-6">
            <Text className="text-sm font-bold text-[#fb565b]">{errorMessage}</Text>
          </View>
        )}

        {!isLoading && !isError && detail && (
          <View className="gap-4">
            {detail.recommended_action_hints.length > 0 && (
              <View className="rounded-2xl border border-[#00d992]/30 bg-[#00d992]/5 p-5">
                <Text className="mb-3 text-[10px] font-black uppercase tracking-widest text-[#00d992]">
                  Recommended Action Hints
                </Text>
                {detail.recommended_action_hints.map((hint) => (
                  <View key={hint} className="mb-2 flex-row items-start">
                    <Ionicons name="checkmark-circle" size={14} color="#00d992" />
                    <Text className="ml-2 flex-1 text-xs leading-5 text-[#b8b3b0]">{hint}</Text>
                  </View>
                ))}
              </View>
            )}

            {detail.chunks.length === 0 ? (
              <View className="min-h-[300px] items-center justify-center rounded-2xl border border-[#3d3a39] bg-[#050507] p-8">
                <Ionicons name="document-text-outline" size={40} color="#3d3a39" />
                <Text className="mt-4 text-sm font-bold text-[#8b949e]">
                  No indexed content found.
                </Text>
              </View>
            ) : (
              detail.chunks.map((chunk, index) => (
                <View
                  key={chunk.idx}
                  className="shadow-inner rounded-2xl border border-[#3d3a39] bg-[#050507] p-6">
                  <Text className="mb-4 text-[10px] font-black uppercase tracking-widest text-[#8b949e]">
                    {chunk.section || `Chunk ${index + 1}`}
                  </Text>
                  <Text className="text-sm leading-7 text-[#b8b3b0]">{chunk.content}</Text>
                </View>
              ))
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );

  if (isDesktop) {
    return (
      <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
        <View className="flex-1 flex-row justify-end bg-black/60">
          <TouchableOpacity className="flex-1" onPress={onClose} activeOpacity={1} />
          <Animated.View
            style={{
              width: 600,
              height: '100%',
              backgroundColor: '#101010',
              transform: [{ translateX: slideAnim }],
              boxShadow: '-15px 0 40px rgba(0,0,0,0.6)',
            }}
            className="h-full border-l border-[#3d3a39]">
            {content}
          </Animated.View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView edges={['top', 'bottom']} className="flex-1 bg-[#101010]">
        {content}
      </SafeAreaView>
    </Modal>
  );
}
