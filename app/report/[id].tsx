import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockReports } from '../../data/mock';
import { ThreatBadge } from '../../components/common/StatusBadge';
import { TimelineItem } from '../../components/reports/TimelineItem';

export default function ReportDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const report = mockReports.find((r) => r.id === id);
  if (!report) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-[#0F172A]">
        <Text className="text-[#64748B]">리포트를 찾을 수 없습니다.</Text>
      </SafeAreaView>
    );
  }

  const resolvedAt = new Date(report.resolvedAt).toLocaleString('ko-KR');

  return (
    <ScrollView className="flex-1 bg-[#0F172A]" showsVerticalScrollIndicator={false}>
      <View className="mx-auto w-full max-w-5xl pb-10">
        {/* Header */}
        <View className="mx-4 mt-6 flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center rounded-full bg-[#1E293B]">
            <Ionicons name="arrow-back" size={20} color="#F1F5F9" />
          </TouchableOpacity>
          <Text className="text-xs font-bold uppercase tracking-widest text-[#64748B]">
            In-depth Analysis Report
          </Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Title Section */}
        <View className="mx-4 mt-6">
          <View className="mb-4 flex-row items-center gap-2">
            <ThreatBadge level={report.threatLevel} />
            <View className="rounded-full bg-emerald-500/20 px-3 py-1">
              <Text className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                Closed / Resolved
              </Text>
            </View>
          </View>
          <Text className="text-3xl font-black text-[#F1F5F9]">{report.title}</Text>
          <View className="mt-4 flex-row items-center gap-6">
            <View>
              <Text className="text-[10px] font-bold uppercase tracking-widest text-[#475569]">
                Date Resolved
              </Text>
              <Text className="text-sm font-medium text-[#94A3B8]">{resolvedAt}</Text>
            </View>
            <View>
              <Text className="text-[10px] font-bold uppercase tracking-widest text-[#475569]">
                Approved By
              </Text>
              <Text className="text-sm font-medium text-[#94A3B8]">{report.approvedBy}</Text>
            </View>
          </View>
        </View>

        {/* Summary box */}
        <View className="mx-4 mt-8 rounded-3xl border border-[#334155] bg-[#1E293B] p-6">
          <Text className="mb-4 text-xs font-bold uppercase tracking-widest text-violet-400">
            Executive Summary
          </Text>
          <Text className="text-base leading-7 text-[#F1F5F9]">{report.summary}</Text>
          {report.feedbackComment && (
            <View className="mt-6 rounded-2xl bg-[#0F172A] p-4 text-sm italic text-[#94A3B8]">
              <Text className="mb-1 text-[10px] font-bold uppercase text-[#475569]">
                Administrator Feedback
              </Text>
              <Text className="text-sm italic text-[#94A3B8]">
                &quot;{report.feedbackComment}&quot;
              </Text>
            </View>
          )}
        </View>

        {/* Timeline */}
        <View className="mx-4 mt-10">
          <Text className="mb-6 text-xs font-bold uppercase tracking-widest text-[#64748B]">
            Event Processing Timeline
          </Text>
          <View className="px-2">
            {report.timeline.map((event, idx) => (
              <TimelineItem
                key={event.id}
                event={event}
                isLast={idx === report.timeline.length - 1}
              />
            ))}
          </View>
        </View>

        {/* Footer Actions */}
        <View className="mx-4 mt-10 flex-row gap-3">
          <TouchableOpacity className="flex-1 flex-row items-center justify-center gap-2 rounded-2xl border border-[#334155] bg-[#1E293B] py-4">
            <Ionicons name="share-outline" size={18} color="#8B5CF6" />
            <Text className="font-bold text-[#F1F5F9]">Export PDF</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 flex-row items-center justify-center gap-2 rounded-2xl border border-[#334155] bg-[#1E293B] py-4">
            <Ionicons name="mail-outline" size={18} color="#8B5CF6" />
            <Text className="font-bold text-[#F1F5F9]">Email Report</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
