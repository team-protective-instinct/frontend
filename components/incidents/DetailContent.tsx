import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBadge } from '../common/StatusBadge';
import { AiTerminal } from './AiTerminal';
import type { Incident } from '../../types';

interface DetailContentProps {
  incident: Incident;
}

export function DetailContent({ incident }: DetailContentProps) {
  const [feedback, setFeedback] = useState('');

  const handleAction = (type: 'Approve' | 'Deny') => {
    Alert.alert(`${type} 완료`, `현 시점에서는 데스크탑용 알림창으로 대체됩니다.`);
  };

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <View className="p-6">
        <View className="mb-6 flex-row items-center justify-between">
          <View>
            <Text className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#64748B]">
              Incident Detail
            </Text>
            <Text className="text-2xl font-black text-[#F1F5F9]">{incident.title}</Text>
          </View>
          <StatusBadge status={incident.status} />
        </View>

        <View className="mb-8 flex-row gap-4">
          <View className="flex-1 rounded-2xl border border-[#334155] bg-[#1E293B] p-4">
            <Text className="mb-2 text-[11px] font-bold uppercase text-[#64748B]">Target Info</Text>
            <View className="mb-1 flex-row items-center">
              <Ionicons name="server-outline" size={14} color="#8B5CF6" />
              <Text className="ml-2 text-sm text-[#F1F5F9]">{incident.targetName}</Text>
            </View>
            <Text className="ml-5 font-mono text-xs text-[#64748B]">{incident.targetIp}</Text>
          </View>
          <View className="flex-1 rounded-2xl border border-[#334155] bg-[#1E293B] p-4">
            <Text className="mb-2 text-[11px] font-bold uppercase text-[#64748B]">Detection</Text>
            <View className="mb-1 flex-row items-center">
              <Ionicons name="time-outline" size={14} color="#8B5CF6" />
              <Text className="ml-2 text-sm text-[#F1F5F9]">
                {new Date(incident.detectedAt).toLocaleString('ko-KR')}
              </Text>
            </View>
            <Text className="ml-5 text-xs text-[#64748B]">
              {incident.mitreTechnique} · {incident.mitreName}
            </Text>
          </View>
        </View>

        <View className="mb-8">
          <Text className="mb-3 text-xs font-bold uppercase tracking-widest text-[#94A3B8]">
            AI Thinking Process
          </Text>
          <AiTerminal steps={incident.aiThinkingLog} />
        </View>

        <View className="mb-8">
          <Text className="mb-3 text-xs font-bold uppercase tracking-widest text-[#94A3B8]">
            Proposed Actions
          </Text>
          <View className="overflow-hidden rounded-xl border border-[#334155] bg-[#1E293B]">
            {incident.actionPlan.map((action, idx) => (
              <View
                key={action.id}
                className={`flex-row items-center p-4 ${idx !== 0 ? 'border-t border-[#293548]' : ''}`}>
                <View className="mr-4 h-10 w-10 items-center justify-center rounded-full bg-violet-500/10">
                  <Ionicons name="shield-outline" size={20} color="#8B5CF6" />
                </View>
                <View className="flex-1">
                  <View className="mb-1 flex-row items-center gap-2">
                    <Text className="text-sm font-bold text-[#F1F5F9]">{action.action}</Text>
                    <Text className="font-mono text-[10px] text-amber-400">{action.parameter}</Text>
                  </View>
                  <Text className="text-xs text-[#64748B]">{action.justification}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Action Bar */}
        <View className="flex-row items-center gap-4">
          <TouchableOpacity
            onPress={() => handleAction('Deny')}
            className="flex-1 items-center rounded-xl border border-red-500/30 bg-red-500/10 py-4">
            <Text className="font-bold text-red-400">Deny</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleAction('Approve')}
            className="flex-1 items-center rounded-xl border border-emerald-600 bg-emerald-500 py-4">
            <Text className="font-bold text-white">Approve Action</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-6 flex-row gap-2">
          <TextInput
            value={feedback}
            onChangeText={setFeedback}
            placeholder="Provide feedback to AI..."
            placeholderTextColor="#475569"
            className="flex-1 rounded-xl border border-[#334155] bg-[#0F172A] px-4 py-3 text-[#F1F5F9]"
          />
          <TouchableOpacity className="items-center justify-center rounded-xl bg-violet-500 px-4">
            <Ionicons name="send" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
