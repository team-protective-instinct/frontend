import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { MarkdownText } from '../../common/MarkdownText';
import type { ResponsePlan, ResponsePlanActionStatus, ResponsePlanStatus } from '../../../types';

interface ResponsePlanSectionProps {
  responsePlan?: ResponsePlan | null;
}

const statusStyleMap: Record<ResponsePlanStatus, { label: string; className: string }> = {
  approved: {
    label: 'APPROVED',
    className: 'bg-threat-safe/10 text-threat-safe',
  },
  denied: {
    label: 'DENIED',
    className: 'bg-threat-critical/10 text-threat-critical',
  },
  pending: {
    label: 'PENDING',
    className: 'bg-threat-warning/10 text-threat-warning',
  },
  executing: {
    label: 'EXECUTING',
    className: 'bg-accent/10 text-accent',
  },
  executed: {
    label: 'EXECUTED',
    className: 'bg-threat-safe/10 text-threat-safe',
  },
  failed: {
    label: 'FAILED',
    className: 'bg-threat-critical/10 text-threat-critical',
  },
};

const actionStatusStyleMap: Record<ResponsePlanActionStatus, { label: string; className: string }> =
  {
    pending: { label: 'PENDING', className: 'bg-threat-warning/10 text-threat-warning' },
    executing: { label: 'EXECUTING', className: 'bg-accent/10 text-accent' },
    executed: { label: 'EXECUTED', className: 'bg-threat-safe/10 text-threat-safe' },
    failed: { label: 'FAILED', className: 'bg-threat-critical/10 text-threat-critical' },
    skipped: { label: 'SKIPPED', className: 'bg-bg-primary text-text-muted' },
  };

function formatJson(value: Record<string, unknown> | null | undefined) {
  if (!value || Object.keys(value).length === 0) return null;
  return JSON.stringify(value, null, 2);
}

export function ResponsePlanSection({ responsePlan }: ResponsePlanSectionProps) {
  const statusStyle = responsePlan ? statusStyleMap[responsePlan.status] : null;

  return (
    <View className="mb-6 rounded-2xl border border-border bg-bg-secondary p-5">
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
            Once the response planning agent creates a plan for this incident, its summary and
            defensive actions will appear here.
          </Text>
        </View>
      ) : (
        <View className="gap-4">
          <View>
            <Text className="mb-2 text-xs font-black uppercase tracking-wider text-text-muted">
              Summary
            </Text>
            <MarkdownText>{responsePlan.summary}</MarkdownText>
          </View>

          <View>
            <Text className="mb-2 text-xs font-black uppercase tracking-wider text-text-muted">
              Defensive Actions
            </Text>
            {responsePlan.actions.length === 0 ? (
              <View className="rounded-xl border border-dashed border-border bg-bg-primary/40 p-4">
                <Text className="text-xs leading-5 text-text-muted">
                  No executable defensive actions were generated for this plan.
                </Text>
              </View>
            ) : (
              <View className="gap-3">
                {responsePlan.actions
                  .slice()
                  .sort((a, b) => a.execution_order - b.execution_order) // execution_order 기준으로 정렬
                  .map((action) => {
                    const actionStatus = actionStatusStyleMap[action.status];
                    const argumentsText = formatJson(action.arguments);
                    const resultText = formatJson(action.result);

                    return (
                      <View key={action.idx} className="rounded-xl bg-bg-primary/50 p-4">
                        <View className="mb-3 flex-row items-start justify-between gap-3">
                          <View className="flex-1">
                            <Text className="text-[10px] font-black uppercase text-text-muted">
                              Step {action.execution_order}
                            </Text>
                            <Text className="mt-1 text-sm font-bold capitalize text-text-primary">
                              {action.tool_name}
                            </Text>
                          </View>
                          <View
                            className={`rounded-full px-2.5 py-1 ${actionStatus.className.split(' ')[0]}`}>
                            <Text
                              className={`text-[9px] font-black ${actionStatus.className.split(' ')[1]}`}>
                              {actionStatus.label}
                            </Text>
                          </View>
                        </View>

                        {action.reason ? <MarkdownText muted>{action.reason}</MarkdownText> : null}

                        {argumentsText ? (
                          <View className="mt-3 rounded-lg border border-border bg-bg-secondary p-3">
                            <Text className="mb-1 text-[10px] font-black uppercase text-text-muted">
                              Arguments
                            </Text>
                            <Text className="font-mono text-[11px] leading-5 text-text-secondary">
                              {argumentsText}
                            </Text>
                          </View>
                        ) : null}

                        {resultText ? (
                          <View className="mt-3 rounded-lg border border-border bg-bg-secondary p-3">
                            <Text className="mb-1 text-[10px] font-black uppercase text-text-muted">
                              Result
                            </Text>
                            <Text className="font-mono text-[11px] leading-5 text-text-secondary">
                              {resultText}
                            </Text>
                          </View>
                        ) : null}
                      </View>
                    );
                  })}
              </View>
            )}
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
