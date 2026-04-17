import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { AiThinkingStep } from '../../types';

const TYPE_COLOR: Record<AiThinkingStep['type'], string> = {
  search: '#3B82F6',
  analysis: '#F59E0B',
  decision: '#8B5CF6',
  complete: '#10B981',
  error: '#EF4444',
};
const TYPE_PREFIX: Record<AiThinkingStep['type'], string> = {
  search: '🔍',
  analysis: '🧠',
  decision: '⚡',
  complete: '✅',
  error: '❌',
};

interface AiTerminalProps {
  steps: AiThinkingStep[];
}

export function AiTerminal({ steps }: AiTerminalProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    setVisibleCount(0); // Reset when steps change (new incident selected)
  }, [steps]);

  useEffect(() => {
    if (visibleCount < steps.length) {
      const timer = setTimeout(() => {
        setVisibleCount((c) => c + 1);
        scrollRef.current?.scrollToEnd({ animated: true });
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [visibleCount, steps.length]);

  return (
    <View className="overflow-hidden rounded-xl border border-[#1E3A5F] bg-[#020817]">
      <View className="flex-row items-center border-b border-[#1E3A5F] bg-[#0F172A] px-3 py-2">
        <View className="mr-1.5 h-2.5 w-2.5 rounded-full bg-red-500" />
        <View className="mr-1.5 h-2.5 w-2.5 rounded-full bg-amber-400" />
        <View className="mr-3 h-2.5 w-2.5 rounded-full bg-emerald-500" />
        <Text className="font-mono text-[10px] text-[#3B82F6]">AI Engine Console</Text>
      </View>
      <ScrollView
        ref={scrollRef}
        style={{ maxHeight: 200, padding: 12 }}
        showsVerticalScrollIndicator={false}>
        {steps.slice(0, visibleCount).map((step) => (
          <View key={step.id} className="mb-2">
            <Text style={{ color: '#475569', fontFamily: 'monospace', fontSize: 9 }}>
              [{new Date(step.timestamp).toLocaleTimeString('ko-KR')}]
            </Text>
            <Text
              style={{
                color: TYPE_COLOR[step.type],
                fontFamily: 'monospace',
                fontSize: 11,
                marginTop: 1,
              }}>
              {TYPE_PREFIX[step.type]} {step.message}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
