import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Accordion } from '../../common/Accordion';

interface EvidenceLogProps {
  rawLog: string;
  isDesktop: boolean;
  logModalVisible: boolean;
  setLogModalVisible: (visible: boolean) => void;
}

export function EvidenceLog({
  rawLog,
  isDesktop,
  logModalVisible,
  setLogModalVisible,
}: EvidenceLogProps) {
  return (
    <>
      <View className="mb-10">
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8b949e]">
            Evidence Log
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            className="rounded border border-[#3d3a39] bg-[#3d3a39]/20 px-3 py-1">
            <Text className="text-[10px] font-black text-[#00d992]">DOWNLOAD JSON</Text>
          </TouchableOpacity>
        </View>

        {isDesktop ? (
          <Accordion title="Raw Access Log" isOpenInitial={false}>
            <View className="rounded-lg border border-[#3d3a39]/50 bg-[#050507] p-4">
              <Text className="font-mono text-[11px] leading-5 text-[#8b949e]">{rawLog}</Text>
            </View>
          </Accordion>
        ) : (
          <TouchableOpacity
            onPress={() => setLogModalVisible(true)}
            className="flex-row items-center justify-between rounded-xl border border-[#3d3a39] bg-[#050507] p-4">
            <View className="flex-row items-center">
              <Ionicons name="document-text-outline" size={20} color="#00d992" />
              <Text className="ml-3 text-xs font-bold text-[#f2f2f2]">View Full Evidence Log</Text>
            </View>
            <Ionicons name="open-outline" size={16} color="#8b949e" />
          </TouchableOpacity>
        )}
      </View>

      {/* Full Screen Log Viewer for Mobile */}
      <Modal
        visible={logModalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setLogModalVisible(false)}>
        <SafeAreaView className="flex-1 bg-[#050507]">
          <View className="flex-row items-center justify-between border-b border-[#3d3a39] px-6 py-5">
            <Text className="text-lg font-black text-[#f2f2f2]">Evidence Explorer</Text>
            <TouchableOpacity onPress={() => setLogModalVisible(false)} className="p-2">
              <Ionicons name="close" size={28} color="#8b949e" />
            </TouchableOpacity>
          </View>
          <ScrollView className="flex-1 p-6">
            <View className="rounded-2xl border border-[#3d3a39] bg-[#101010] p-5">
              <Text className="font-mono text-[11px] leading-5 text-[#00d992]">{rawLog}</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </>
  );
}
