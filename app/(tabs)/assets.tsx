import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockVictimServers } from '../../data/mock';
import { useIsDesktop } from '../../hooks/useIsDesktop';
import { Table } from '../../components/common/Table';

export default function AssetsScreen() {
  const isDesktop = useIsDesktop();

  return (
    <SafeAreaView className="flex-1 bg-bg-primary" edges={isDesktop ? [] : ['bottom']}>
      <View className="flex-1" style={{ padding: isDesktop ? 40 : 20 }}>
        
        {/* Header */}
        <View className="flex-row justify-between items-end mb-8">
          <View>
            <Text className="text-3xl font-black tracking-tighter text-text-primary">ASSETS</Text>
            <Text className="mt-1 text-sm font-medium text-text-muted">Protected infrastructure nodes</Text>
          </View>
          
          {isDesktop && (
            <TouchableOpacity className="bg-accent px-6 py-3 rounded-xl flex-row items-center shadow-[0_0_15px_rgba(0,217,146,0.3)]">
              <Ionicons name="add" size={20} color="#050507" />
              <Text className="ml-2 text-sm font-black text-bg-primary">ADD ASSET</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Assets List (Table 추상화 적용) */}
        <Table>
          {isDesktop && (
            <Table.Header>
              <Table.Head width="w-16">OS</Table.Head>
              <Table.Head>Node Name / IP</Table.Head>
              <Table.Head width="w-48">Agent Status</Table.Head>
              <Table.Head width="w-64">Last Seen</Table.Head>
              <Table.Head width="w-24" className="text-right">Actions</Table.Head>
            </Table.Header>
          )}

          <Table.Body 
            data={mockVictimServers}
            emptyIcon="server-outline"
            emptyText="No assets found."
            renderItem={(server, idx, isLast) => (
              <Table.Row key={server.id} isLast={isLast}>
                <Table.Cell width="w-16">
                  <Ionicons 
                    name={server.os === 'Linux' ? 'logo-tux' : 'logo-windows'} 
                    size={20} 
                    color="#b8b3b0" 
                  />
                </Table.Cell>
                
                <Table.Cell>
                  <Text className="text-sm font-bold text-text-primary">{server.name}</Text>
                  <Text className="text-[10px] font-mono text-text-muted">{server.ip}</Text>
                </Table.Cell>

                {isDesktop && (
                  <>
                    <Table.Cell width="w-48" className="flex-row items-center">
                      <View className={`w-2 h-2 rounded-full mr-2 ${server.agentStatus === 'connected' ? 'bg-threat-safe shadow-[0_0_8px_#00d992]' : 'bg-threat-critical'}`} />
                      <Text className={`text-xs font-bold uppercase tracking-tighter ${server.agentStatus === 'connected' ? 'text-threat-safe' : 'text-threat-critical'}`}>
                        {server.agentStatus === 'connected' ? 'Connected' : 'Offline'}
                      </Text>
                    </Table.Cell>
                    <Table.Cell width="w-64">
                      <Text className="text-xs text-text-muted">{new Date(server.lastSeen).toLocaleString()}</Text>
                    </Table.Cell>
                  </>
                )}

                {!isDesktop && (
                  <Table.Cell className="flex-row items-center justify-end">
                    <View className={`w-2 h-2 rounded-full ${server.agentStatus === 'connected' ? 'bg-threat-safe' : 'bg-threat-critical'} mr-4`} />
                    <TouchableOpacity className="p-2">
                      <Ionicons name="ellipsis-vertical" size={18} color="#3d3a39" />
                    </TouchableOpacity>
                  </Table.Cell>
                )}

                {isDesktop && (
                  <Table.Cell width="w-24" className="items-end">
                    <TouchableOpacity className="p-2">
                      <Ionicons name="ellipsis-horizontal" size={20} color="#3d3a39" />
                    </TouchableOpacity>
                  </Table.Cell>
                )}
              </Table.Row>
            )}
          />
        </Table>
      </View>
    </SafeAreaView>
  );
}
