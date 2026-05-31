

import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import type { ResponsePlan } from '../../../types';

interface ResponsePlanSectionProps {
  responsePlan?: ResponsePlan | null;
}

const statusStyleMap: Record<ResponsePlan['status'], { label: string; className: string }> = {
  APPROVED: {
    label: 'APPROVED',
    className: 'bg-threat-safe/10 text-threat-safe',
  },
  DENIED: {
    label: 'DENIED',
    className: 'bg-threat-critical/10 text-threat-critical',
  },
  PENDING: {
    label: 'PENDING',
    className: 'bg-threat-warning/10 text-threat-warning',
  },
};

export function ResponsePlanSection({ responsePlan }: ResponsePlanSectionProps) {
  const statusStyle = responsePlan ? statusStyleMap[responsePlan.status] : null;

  return (
    <View className="rounded-2xl border border-border bg-bg-secondary p-5">
      <View className="mb-4 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View className="mr-3 h-9 w-9 items-center justify-center rounded-xl bg-accent/10">
            <Ionicons name="document-text-outline" size={18} color="#00d992" />
          </View>
          <View>
            <Text className="text-base font-black text-text-primary">Response Plan</Text>
            <Text className="mt-0.5 text-[11px] font-medium text-text-muted">
              AI-generated incident response procedure
            </Text>
          </View>
        </View>

        {statusStyle && (
          <View className={`rounded-full px-3 py-1 ${statusStyle.className.split(' ')[0]}`}>
            <Text className={`text-[10px] font-black ${statusStyle.className.split(' ')[1]}`}>
              {statusStyle.label}
            </Text>
          </View>
        )}
      </View>

      {!responsePlan ? (
        <View className="rounded-xl border border-dashed border-border bg-bg-primary/40 p-5">
          <Text className="text-sm font-bold text-text-secondary">
            No response plan generated yet.
          </Text>
          <Text className="mt-2 text-xs leading-5 text-text-muted">
            Once the response planning agent creates a plan for this incident, its summary and detailed procedure will appear here.
          </Text>
        </View>
      ) : (
        <View className="gap-4">
          <View>
            <Text className="mb-2 text-xs font-black uppercase tracking-wider text-text-muted">
              Summary
            </Text>
            <Text className="text-sm leading-6 text-text-primary">{responsePlan.summary}</Text>
          </View>

          <View>
            <Text className="mb-2 text-xs font-black uppercase tracking-wider text-text-muted">
              Response Procedure
            </Text>
            <View className="rounded-xl bg-bg-primary/50 p-4">
              <Text className="text-sm leading-6 text-text-secondary">{responsePlan.plan_text}</Text>
            </View>
          </View>

          <View>
            <Text className="mb-2 text-xs font-black uppercase tracking-wider text-text-muted">
              Rationale
            </Text>
            <Text className="text-sm leading-6 text-text-secondary">{responsePlan.rationale}</Text>
          </View>

          <View className="flex-row flex-wrap gap-3 border-t border-border pt-4">
            <View>
              <Text className="text-[10px] font-black uppercase text-text-muted">Created</Text>
              <Text className="mt-1 text-xs text-text-secondary">
                {new Date(responsePlan.created_at).toLocaleString()}
              </Text>
            </View>
            <View>
              <Text className="text-[10px] font-black uppercase text-text-muted">Modified</Text>
              <Text className="mt-1 text-xs text-text-secondary">
                {new Date(responsePlan.modified_at).toLocaleString()}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}