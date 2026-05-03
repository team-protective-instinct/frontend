import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockPlaybooks } from '../../data/mock';
import { useIsDesktop } from '../../hooks/useIsDesktop';
import { PlaybookPreviewPanel } from '../../components/playbooks/PlaybookPreviewPanel';
import { Table } from '../../components/common/Table';
import { Playbook } from '../../types';

export default function PlaybooksScreen() {
  const isDesktop = useIsDesktop();
  const [search, setSearch] = useState('');
  const [selectedPlaybook, setSelectedPlaybook] = useState<Playbook | null>(null);

  const filteredPlaybooks = mockPlaybooks.filter((pb) =>
    pb.fileName.toLowerCase().includes(search.toLowerCase())
  );

  const getSyncBadge = (status: string) => {
    switch (status) {
      case 'synced':
        return {
          label: 'AI SYNCED',
          color: '#00d992',
          bg: 'bg-threat-safe/10',
          textColor: 'text-threat-safe',
          icon: 'checkmark-circle',
        };
      case 'vectorizing':
        return {
          label: 'VECTORIZING',
          color: '#ffba00',
          bg: 'bg-threat-warning/10',
          textColor: 'text-threat-warning',
          icon: 'sync',
        };
      case 'extracting':
        return {
          label: 'EXTRACTING',
          color: '#3b82f6',
          bg: 'bg-threat-info/10',
          textColor: 'text-threat-info',
          icon: 'document-text',
        };
      default:
        return {
          label: 'UNKNOWN',
          color: '#8b949e',
          bg: 'bg-threat-dismissed/10',
          textColor: 'text-text-muted',
          icon: 'help-circle',
        };
    }
  };

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
              AI RAG Knowledge Base for Response
            </Text>
          </View>

          <View className="w-full flex-row items-center gap-3 lg:w-auto">
            <View
              className={`${isDesktop ? 'w-80' : 'flex-1'} flex-row items-center rounded-xl border border-border bg-bg-secondary px-4 py-2.5`}>
              <Ionicons name="search" size={18} color="#8b949e" />
              <TextInput
                placeholder="Search procedures..."
                placeholderTextColor="#8b949e"
                value={search}
                onChangeText={setSearch}
                className="ml-3 flex-1 text-sm text-text-primary"
                style={{ outlineStyle: 'none' } as any}
              />
            </View>

            {isDesktop && (
              <TouchableOpacity className="flex-row items-center rounded-xl bg-accent px-6 py-3 shadow-[0_0_15px_rgba(0,217,146,0.3)]">
                <Ionicons name="cloud-upload" size={20} color="#050507" />
                <Text className="ml-2 text-sm font-black text-bg-primary">UPLOAD PLAYBOOK</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Dropzone (PC only) */}
        {isDesktop && (
          <TouchableOpacity className="mb-8 h-40 items-center justify-center rounded-2xl border-2 border-dashed border-border bg-bg-secondary/30 transition-all hover:border-accent/50 hover:bg-accent/5">
            <Ionicons name="document-attach-outline" size={40} color="#3d3a39" />
            <Text className="mt-4 text-sm font-bold text-text-secondary">
              Drag & drop security procedures (PDF, DOCX, MD, TXT)
            </Text>
            <Text className="mt-2 text-[10px] text-text-muted">Maximum file size: 50MB</Text>
          </TouchableOpacity>
        )}

        {/* Knowledge Base List (Table 추상화 적용) */}
        <Table className="mb-4">
          {isDesktop && (
            <Table.Header>
              <Table.Head width="w-12">Type</Table.Head>
              <Table.Head>Document Name</Table.Head>
              <Table.Head width="w-32">Size</Table.Head>
              <Table.Head width="w-48">Status</Table.Head>
              <Table.Head width="w-40">Uploaded</Table.Head>
              <Table.Head width="w-12"> </Table.Head>
            </Table.Header>
          )}

          <Table.Body
            data={filteredPlaybooks}
            emptyIcon="document-text-outline"
            emptyText="No documents found."
            renderItem={(pb, idx, isLast) => {
              const badge = getSyncBadge(pb.syncStatus);
              return (
                <Table.Row key={pb.id} onPress={() => setSelectedPlaybook(pb)} isLast={isLast}>
                  <Table.Cell width="w-12">
                    <View className="h-8 w-8 items-center justify-center rounded border border-border bg-bg-elevated">
                      <Text className="text-[9px] font-black text-accent">{pb.fileType}</Text>
                    </View>
                  </Table.Cell>

                  <Table.Cell>
                    <Text className="text-sm font-bold text-text-primary">{pb.fileName}</Text>
                    {!isDesktop && (
                      <View className="mt-1 flex-row items-center">
                        <Text className="text-[10px] text-text-muted">
                          {(pb.fileSize / 1024 / 1024).toFixed(2)} MB
                        </Text>
                        <Text className="mx-2 text-border">•</Text>
                        <Text className={`text-[10px] font-bold ${badge.textColor}`}>
                          {badge.label}
                        </Text>
                      </View>
                    )}
                  </Table.Cell>

                  {isDesktop && (
                    <>
                      <Table.Cell width="w-32">
                        <Text className="font-mono text-xs text-text-secondary">
                          {(pb.fileSize / 1024 / 1024).toFixed(2)} MB
                        </Text>
                      </Table.Cell>
                      <Table.Cell width="w-48">
                        <View
                          className={`flex-row items-center self-start rounded px-2 py-1 ${badge.bg}`}>
                          <Ionicons name={badge.icon as any} size={12} color={badge.color} />
                          <Text className={`ml-2 text-[10px] font-black ${badge.textColor}`}>
                            {badge.label}
                          </Text>
                        </View>
                      </Table.Cell>
                      <Table.Cell width="w-40">
                        <Text className="text-xs text-text-muted">
                          {new Date(pb.uploadedAt).toLocaleDateString()}
                        </Text>
                      </Table.Cell>
                      <Table.Cell width="w-12" className="items-end">
                        <TouchableOpacity className="p-2">
                          <Ionicons name="trash-outline" size={18} color="#fb565b" opacity={0.6} />
                        </TouchableOpacity>
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
