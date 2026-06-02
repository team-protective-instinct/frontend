import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Accordion } from '../../common/Accordion';
import type { IncidentRawLog } from '../../../types';

interface EvidenceLogProps {
  rawLogs: IncidentRawLog[];
  isDesktop: boolean;
  logModalVisible: boolean;
  setLogModalVisible: (visible: boolean) => void;
}

export function EvidenceLog({
  rawLogs,
  isDesktop,
  logModalVisible,
  setLogModalVisible,
}: EvidenceLogProps) {
  const hasLogs = rawLogs.length > 0;

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

        {!hasLogs ? (
          <View className="rounded-xl border border-[#3d3a39] bg-[#050507] p-4">
            <Text className="text-xs font-semibold text-[#8b949e]">No raw logs available.</Text>
          </View>
        ) : isDesktop ? (
          rawLogs.map((rawLog, index) => (
            <Accordion key={rawLog.idx} title={getRawLogTitle(rawLog, index)} isOpenInitial={false}>
              <RawLogCard rawLog={rawLog} textColor="text-[#8b949e]" />
            </Accordion>
          ))
        ) : (
          <TouchableOpacity
            onPress={() => setLogModalVisible(true)}
            className="flex-row items-center justify-between rounded-xl border border-[#3d3a39] bg-[#050507] p-4">
            <View className="flex-row items-center">
              <Ionicons name="document-text-outline" size={20} color="#00d992" />
              <Text className="ml-3 text-xs font-bold text-[#f2f2f2]">
                View {rawLogs.length} Evidence Log{rawLogs.length === 1 ? '' : 's'}
              </Text>
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
            {rawLogs.map((rawLog) => (
              <RawLogCard key={rawLog.idx} rawLog={rawLog} textColor="text-[#00d992]" />
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </>
  );
}

function RawLogCard({ rawLog, textColor }: { rawLog: IncidentRawLog; textColor: string }) {
  return (
    <View className="mb-4 rounded-2xl border border-[#3d3a39] bg-[#101010] p-5">
      <View className="mb-3 flex-row flex-wrap items-center gap-2">
        <Text className="rounded-full bg-[#00d992]/10 px-2 py-1 text-[10px] font-black uppercase text-[#00d992]">
          {formatSourceType(rawLog.source_type)}
        </Text>
        <Text className="text-[10px] font-semibold text-[#8b949e]">
          {formatTimestamp(rawLog.created_at)}
        </Text>
      </View>
      <Text className={`font-mono text-[11px] leading-5 ${textColor}`}>
        {JSON.stringify(rawLog.raw_payload, null, 2)}
      </Text>
    </View>
  );
}

function getRawLogTitle(rawLog: IncidentRawLog, index: number): string {
  return `${formatSourceType(rawLog.source_type)} #${index + 1}`;
}

function formatSourceType(sourceType: string): string {
  return sourceType.replace(/_/g, ' ').toUpperCase();
}

function formatTimestamp(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}
