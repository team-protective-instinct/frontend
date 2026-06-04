import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import type { IncidentDetail } from '../../../types';

interface DetailActionButtonsProps {
  incident: IncidentDetail;
  isDesktop: boolean;
  onApprove: () => void;
  onDeny: (reason: string) => void;
  isSubmitting: boolean;
  errorMessage?: string | null;
}

export function DetailActionButtons({
  incident,
  isDesktop,
  onApprove,
  onDeny,
  isSubmitting,
  errorMessage,
}: DetailActionButtonsProps) {
  const [denyModalVisible, setDenyModalVisible] = useState(false);
  const [denyReason, setDenyReason] = useState('');

  if (incident.response_plan?.status !== 'pending') return null;

  const trimmedReason = denyReason.trim();
  const canSubmitDeny = trimmedReason.length > 0 && !isSubmitting;

  return (
    <>
      <View
        style={styles.footer}
        className={`border-t border-[#3d3a39] bg-[#101010] p-6 ${isDesktop ? '' : ''}`}>
        {errorMessage ? (
          <Text className="mb-3 text-xs font-bold text-threat-critical">{errorMessage}</Text>
        ) : null}

        <View className={`flex-row gap-4 ${isDesktop ? 'items-center justify-end' : ''}`}>
          <TouchableOpacity
            className={`${isDesktop ? 'px-8' : 'flex-1'} items-center rounded-2xl border border-[#3d3a39] bg-bg-secondary py-4 ${isSubmitting ? 'opacity-50' : ''}`}
            onPress={() => setDenyModalVisible(true)}
            disabled={isSubmitting}
            activeOpacity={0.8}>
            <Text className="text-sm font-black uppercase tracking-widest text-text-primary">
              DENY
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`${isDesktop ? 'px-10' : 'flex-[2]'} items-center rounded-2xl bg-accent py-4 shadow-[0_0_20px_rgba(0,217,146,0.4)] ${isSubmitting ? 'opacity-50' : ''}`}
            onPress={onApprove}
            disabled={isSubmitting}
            activeOpacity={0.8}>
            <Text className="text-sm font-black uppercase tracking-widest text-bg-primary">
              {isSubmitting ? 'SUBMITTING...' : 'APPROVE & EXECUTE'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={denyModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDenyModalVisible(false)}>
        <View className="flex-1 items-center justify-center bg-black/70 p-6">
          <View className="w-full max-w-xl rounded-2xl border border-border bg-bg-secondary p-5">
            <Text className="text-base font-black text-text-primary">Deny Response Plan</Text>
            <Text className="mt-2 text-xs leading-5 text-text-muted">
              Enter a reason. Pending defensive actions will be skipped.
            </Text>

            <TextInput
              value={denyReason}
              onChangeText={setDenyReason}
              placeholder="Reason for denial"
              placeholderTextColor="#8b949e"
              multiline
              className="mt-4 min-h-24 rounded-xl border border-border bg-bg-primary p-4 text-sm text-text-primary"
              textAlignVertical="top"
            />

            <View className="mt-5 flex-row justify-end gap-3">
              <TouchableOpacity
                className="rounded-xl border border-border px-5 py-3"
                onPress={() => setDenyModalVisible(false)}
                disabled={isSubmitting}>
                <Text className="text-xs font-black uppercase text-text-primary">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`rounded-xl bg-threat-critical px-5 py-3 ${canSubmitDeny ? '' : 'opacity-50'}`}
                onPress={() => {
                  if (!canSubmitDeny) return;
                  onDeny(trimmedReason);
                  setDenyModalVisible(false);
                  setDenyReason('');
                }}
                disabled={!canSubmitDeny}>
                <Text className="text-xs font-black uppercase text-white">Deny Plan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
});
