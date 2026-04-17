import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
  Alert,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockIncidents } from '../../data/mock';
import { ThreatBadge, StatusBadge } from '../../components/common/StatusBadge';
import { AiTerminal } from '../../components/incidents/AiTerminal';
import { EvidenceBlock } from '../../components/incidents/EvidenceBlock';
import { ActionTable } from '../../components/incidents/ActionTable';

export default function ActionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [feedback, setFeedback] = useState('');
  const approveScale = useRef(new Animated.Value(1)).current;
  const denyScale = useRef(new Animated.Value(1)).current;

  const incident = mockIncidents.find((i) => i.id === id);
  if (!incident) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-[#0F172A]">
        <Text className="text-[#64748B]">사건을 찾을 수 없습니다.</Text>
      </SafeAreaView>
    );
  }

  const animateButton = (anim: Animated.Value, cb: () => void) => {
    Animated.sequence([
      Animated.timing(anim, {
        toValue: 0.92,
        duration: 80,
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(anim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: Platform.OS !== 'web',
      }),
    ]).start(cb);
  };

  const handleApprove = () => {
    animateButton(approveScale, () => {
      Alert.alert(
        '✅ 승인 완료',
        `${incident.actionPlan.length}개 조치가 Victim MCP로 전송됩니다.`,
        [
          {
            text: '확인',
            onPress: () => {
              router.back();
            },
          },
        ]
      );
    });
  };

  const handleDeny = () => {
    animateButton(denyScale, () => {
      Alert.alert(
        '❌ 반려',
        '사건을 오탐으로 처리합니다. 해당 사건은 DISMISSED 상태로 변경됩니다.',
        [
          { text: '취소', style: 'cancel' },
          {
            text: '반려',
            style: 'destructive',
            onPress: () => {
              router.back();
            },
          },
        ]
      );
    });
  };

  const handleFeedbackSend = () => {
    if (!feedback.trim()) return;
    Alert.alert(
      '💬 피드백 전송',
      `AI가 다음 피드백을 반영하여 계획을 재수립합니다:\n\n"${feedback}"`,
      [
        { text: '전송', onPress: () => setFeedback('') },
        { text: '취소', style: 'cancel' },
      ]
    );
  };

  const detectedAt = new Date(incident.detectedAt).toLocaleString('ko-KR');

  return (
    <ScrollView className="flex-1 bg-[#0F172A]" showsVerticalScrollIndicator={false}>
      <View className="mx-auto w-full max-w-5xl pb-10">
        {/* ── PART A: 사건 개요 ─────────────────────────────────────────────── */}
        <View className="mx-4 mt-4 rounded-2xl border border-[#334155] bg-[#1E293B] p-4">
          <Text className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">
            📋 사건 개요
          </Text>

          {/* Badges */}
          <View className="mb-3 flex-row flex-wrap gap-2">
            <ThreatBadge level={incident.threatLevel} />
            <StatusBadge status={incident.status} />
            {incident.mitreTechnique && (
              <View className="rounded-full bg-violet-500/20 px-3 py-1">
                <Text className="font-mono text-xs text-violet-400">
                  {incident.mitreTechnique} · {incident.mitreName}
                </Text>
              </View>
            )}
          </View>

          <Text className="mb-3 text-xl font-black text-[#F1F5F9]">{incident.title}</Text>

          {/* Meta info */}
          <View className="gap-2">
            <View className="flex-row items-center gap-2">
              <Ionicons name="server-outline" size={14} color="#8B5CF6" />
              <Text className="text-xs text-[#94A3B8]">
                {incident.targetName}
                <Text className="text-[#64748B]"> · {incident.targetIp}</Text>
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Ionicons name="time-outline" size={14} color="#8B5CF6" />
              <Text className="text-xs text-[#94A3B8]">{detectedAt}</Text>
            </View>
          </View>

          <Text className="mt-3 text-sm leading-5 text-[#94A3B8]">{incident.summary}</Text>
        </View>

        {/* AI 思考 Terminal */}
        <View className="mx-4 mt-4">
          <Text className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">
            🤖 AI 사고 흐름 (ReAct Loop)
          </Text>
          <AiTerminal steps={incident.aiThinkingLog} />
        </View>

        {/* Evidence */}
        {incident.evidence.length > 0 && (
          <View className="mx-4 mt-4">
            <Text className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">
              🔎 핵심 증거 로그
            </Text>
            <View className="gap-2">
              {incident.evidence.map((ev) => (
                <EvidenceBlock key={ev.id} raw={ev.raw} source={ev.source} />
              ))}
            </View>
          </View>
        )}

        {/* Divider */}
        <View className="mx-4 mb-6 mt-6 h-px bg-[#334155]" />

        {/* ── PART B: 방어 조치 통제반 ──────────────────────────────────────── */}
        <View className="mx-4">
          <Text className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">
            🛡️ 구조화된 방어 조치 (Governance Board)
          </Text>
          <ActionTable items={incident.actionPlan} />
        </View>

        {/* Approve / Deny */}
        {incident.status === 'PENDING' && (
          <View className="mx-4 mt-5 flex-row gap-3">
            <Animated.View style={{ flex: 1, transform: [{ scale: denyScale }] }}>
              <TouchableOpacity
                onPress={handleDeny}
                className="items-center rounded-2xl border border-red-500/40 bg-red-500/20 py-4">
                <Ionicons name="close-circle-outline" size={24} color="#EF4444" />
                <Text className="mt-1 text-sm font-bold text-red-400">❌ 반려 (Deny)</Text>
                <Text className="mt-0.5 text-xs text-red-400/60">오탐 처리</Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={{ flex: 1, transform: [{ scale: approveScale }] }}>
              <TouchableOpacity
                onPress={handleApprove}
                className="items-center rounded-2xl border border-emerald-500/40 bg-emerald-500/20 py-4">
                <Ionicons name="checkmark-circle-outline" size={24} color="#10B981" />
                <Text className="mt-1 text-sm font-bold text-emerald-400">✅ 승인 (Approve)</Text>
                <Text className="mt-0.5 text-xs text-emerald-400/60">즉시 타격</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        )}

        {/* Feedback box */}
        <View className="mx-4 mt-4 rounded-2xl border border-[#334155] bg-[#1E293B] p-4">
          <Text className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">
            💬 자연어 피드백
          </Text>
          <Text className="mb-3 text-xs text-[#64748B]">
            AI가 계획을 재수립하도록 지시사항을 입력하세요.
          </Text>
          <View className="flex-row gap-2">
            <TextInput
              value={feedback}
              onChangeText={setFeedback}
              placeholder="예: 웹쉘 파일만 삭제하고 프로세스는 더 지켜봐"
              placeholderTextColor="#475569"
              className="flex-1 rounded-xl border border-[#334155] bg-[#0F172A] px-4 py-3 text-sm text-[#F1F5F9]"
              multiline
            />
            <TouchableOpacity
              onPress={handleFeedbackSend}
              className="items-center justify-center rounded-xl border border-violet-500/40 bg-violet-500/20 px-4">
              <Ionicons name="send" size={18} color="#8B5CF6" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
