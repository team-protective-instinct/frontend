import { useMemo, useState } from 'react';
import { View, Text, TextInput, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsDesktop } from '../../hooks/useIsDesktop';
import { usePlaybooks } from '../../hooks/usePlaybooks';
import { PlaybookPreviewPanel } from '../../components/playbooks/PlaybookPreviewPanel';
import { Table } from '../../components/common/Table';
import type { PlaybookListItem } from '../../types';

type IconName = keyof typeof Ionicons.glyphMap;

function getFileType(sourceFile: string) {
  const extension = sourceFile.split('.').pop()?.toUpperCase();
  return extension || 'MD';
}

function getStatusBadge(isActive: boolean): {
  label: string;
  color: string;
  bg: string;
  textColor: string;
  icon: IconName;
} {
  if (isActive) {
    return {
      label: 'INDEXED',
      color: '#00d992',
      bg: 'bg-threat-safe/10',
      textColor: 'text-threat-safe',
      icon: 'checkmark-circle',
    };
  }

  return {
    label: 'INACTIVE',
    color: '#8b949e',
    bg: 'bg-threat-dismissed/10',
    textColor: 'text-text-muted',
    icon: 'pause-circle',
  };
}

export default function PlaybooksScreen() {
  const isDesktop = useIsDesktop();
  const { playbooks, loading, error } = usePlaybooks();
  const [search, setSearch] = useState('');
  const [selectedPlaybook, setSelectedPlaybook] = useState<PlaybookListItem | null>(null);

  const filteredPlaybooks = useMemo(
    () =>
      playbooks.filter((playbook) => {
        const keyword = search.trim().toLowerCase();
        if (!keyword) return true;

        return [playbook.title, playbook.source_file, playbook.tactic]
          .join(' ')
          .toLowerCase()
          .includes(keyword);
      }),
    [playbooks, search]
  );

  return (
    <SafeAreaView className="flex-1 bg-bg-primary" edges={isDesktop ? [] : ['bottom']}>
      <View className="flex-1" style={{ padding: isDesktop ? 40 : 20 }}>
        {/* Header */}
        <View
          className={`${isDesktop ? 'flex-row' : 'flex-col'} mb-8 items-start justify-between gap-6`}>
          <View>
            <Text className="text-3xl font-black tracking-tighter text-text-primary">
              PLAYBOOKS
            </Text>
            <Text className="mt-1 text-sm font-medium text-text-muted">
              Indexed RAG Knowledge Base for Response
            </Text>
          </View>

          <View className="w-full flex-row items-center lg:w-auto">
            <View
              className={`${isDesktop ? 'w-80' : 'flex-1'} flex-row items-center rounded-xl border border-border bg-bg-secondary px-4 py-2.5`}>
              <Ionicons name="search" size={18} color="#8b949e" />
              <TextInput
                placeholder="Search procedures..."
                placeholderTextColor="#8b949e"
                value={search}
                onChangeText={setSearch}
                className="ml-3 flex-1 text-sm text-text-primary"
              />
            </View>
          </View>
        </View>

        {loading && (
          <View className="mb-4 flex-row items-center rounded-xl border border-border bg-bg-secondary px-4 py-3">
            <ActivityIndicator size="small" color="#00d992" />
            <Text className="ml-3 text-sm font-bold text-text-secondary">Loading playbooks...</Text>
          </View>
        )}

        {error && (
          <View className="mb-4 rounded-xl border border-threat-critical/40 bg-threat-critical/10 px-4 py-3">
            <Text className="text-sm font-bold text-threat-critical">{error}</Text>
          </View>
        )}

        {/* Knowledge Base List (Table 추상화 적용) */}
        <Table className="mb-4">
          {isDesktop && (
            <Table.Header>
              <Table.Head width="w-12">Type</Table.Head>
              <Table.Head>Document Name</Table.Head>
              <Table.Head width="w-40">Tactic</Table.Head>
              <Table.Head width="w-48">Status</Table.Head>
              <Table.Head width="w-40">Updated</Table.Head>
            </Table.Header>
          )}

          <Table.Body
            data={filteredPlaybooks}
            emptyIcon="document-text-outline"
            emptyText="No documents found."
            renderItem={(playbook, idx, isLast) => {
              const badge = getStatusBadge(playbook.is_active);
              return (
                <Table.Row
                  key={playbook.idx}
                  onPress={() => setSelectedPlaybook(playbook)}
                  isLast={isLast}>
                  <Table.Cell width="w-12">
                    <View className="h-8 w-8 items-center justify-center rounded border border-border bg-bg-elevated">
                      <Text className="text-[9px] font-black text-accent">
                        {getFileType(playbook.source_file)}
                      </Text>
                    </View>
                  </Table.Cell>

                  <Table.Cell>
                    <Text className="text-sm font-bold text-text-primary">{playbook.title}</Text>
                    <Text className="mt-1 text-[10px] text-text-muted">{playbook.source_file}</Text>
                    {!isDesktop && (
                      <View className="mt-1 flex-row items-center">
                        <Text className="text-[10px] text-text-muted">{playbook.tactic}</Text>
                        <Text className="mx-2 text-border">•</Text>
                        <Text className={`text-[10px] font-bold ${badge.textColor}`}>
                          {badge.label}
                        </Text>
                      </View>
                    )}
                  </Table.Cell>

                  {isDesktop && (
                    <>
                      <Table.Cell width="w-40">
                        <Text className="text-xs font-bold uppercase tracking-wide text-text-secondary">
                          {playbook.tactic}
                        </Text>
                      </Table.Cell>
                      <Table.Cell width="w-48">
                        <View
                          className={`flex-row items-center self-start rounded px-2 py-1 ${badge.bg}`}>
                          <Ionicons name={badge.icon} size={12} color={badge.color} />
                          <Text className={`ml-2 text-[10px] font-black ${badge.textColor}`}>
                            {badge.label}
                          </Text>
                        </View>
                      </Table.Cell>
                      <Table.Cell width="w-40">
                        <Text className="text-xs text-text-muted">
                          {new Date(playbook.modified_at).toLocaleDateString()}
                        </Text>
                      </Table.Cell>
                    </>
                  )}
                </Table.Row>
              );
            }}
          />
        </Table>
      </View>

      <PlaybookPreviewPanel
        visible={!!selectedPlaybook}
        playbook={selectedPlaybook}
        onClose={() => setSelectedPlaybook(null)}
      />
    </SafeAreaView>
  );
}
