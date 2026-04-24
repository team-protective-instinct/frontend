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

export function EvidenceLog({ rawLog, isDesktop, logModalVisible, setLogModalVisible }: EvidenceLogProps) {
  return (
    <>
      <View className="mb-10">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-[10px] font-bold text-[#8b949e] uppercase tracking-[0.3em]">Evidence Log</Text>
          <TouchableOpacity activeOpacity={0.7} className="px-3 py-1 bg-[#3d3a39]/20 rounded border border-[#3d3a39]">
            <Text className="text-[10px] font-black text-[#00d992]">DOWNLOAD JSON</Text>
          </TouchableOpacity>
        </View>
        
        {isDesktop ? (
          <Accordion title="Raw Access Log" isOpenInitial={false}>
            <View className="bg-[#050507] p-4 rounded-lg border border-[#3d3a39]/50">
              <Text className="text-[11px] font-mono text-[#8b949e] leading-5">{rawLog}</Text>
            </View>
          </Accordion>
        ) : (
          <TouchableOpacity 
            onPress={() => setLogModalVisible(true)}
            className="bg-[#050507] p-4 rounded-xl border border-[#3d3a39] flex-row items-center justify-between"
          >
            <View className="flex-row items-center">
              <Ionicons name="document-text-outline" size={20} color="#00d992" />
              <Text className="ml-3 text-xs font-bold text-[#f2f2f2]">View Full Evidence Log</Text>
            </View>
            <Ionicons name="open-outline" size={16} color="#8b949e" />
          </TouchableOpacity>
        )}
      </View>

      {/* Full Screen Log Viewer for Mobile */}
      <Modal visible={logModalVisible} animationType="slide" transparent={false} onRequestClose={() => setLogModalVisible(false)}>
        <SafeAreaView className="flex-1 bg-[#050507]">
          <View className="px-6 py-5 border-b border-[#3d3a39] flex-row justify-between items-center">
            <Text className="text-lg font-black text-[#f2f2f2]">Evidence Explorer</Text>
            <TouchableOpacity onPress={() => setLogModalVisible(false)} className="p-2">
              <Ionicons name="close" size={28} color="#8b949e" />
            </TouchableOpacity>
          </View>
          <ScrollView className="flex-1 p-6">
            <View className="bg-[#101010] p-5 rounded-2xl border border-[#3d3a39]">
              <Text className="text-[11px] font-mono text-[#00d992] leading-5">{rawLog}</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </>
  );
}
