import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface IncidentFilterBarProps {
  isDesktop: boolean;
  search: string;
  setSearch: (text: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  severityFilter: string;
  setSeverityFilter: (severity: string) => void;
  totalCount: number;
}

export function IncidentFilterBar({
  isDesktop,
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  severityFilter,
  setSeverityFilter,
  totalCount,
}: IncidentFilterBarProps) {
  
  const renderFilterOptions = () => (
    <View className={`${isDesktop ? 'flex-row items-center gap-4' : 'gap-4'}`}>
      <View className="flex-row items-center gap-2">
        <Text className="text-[10px] font-bold text-text-muted uppercase">Status</Text>
        <View className="flex-row bg-bg-primary border border-border rounded-lg overflow-hidden">
          {['ALL', 'PENDING', 'RESOLVED'].map(s => (
            <TouchableOpacity 
              key={s} 
              onPress={() => setStatusFilter(s)}
              className={`px-3 py-1.5 ${statusFilter === s ? 'bg-accent' : ''}`}
            >
              <Text className={`text-[10px] font-bold ${statusFilter === s ? 'text-bg-primary' : 'text-text-muted'}`}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View className="flex-row items-center gap-2">
        <Text className="text-[10px] font-bold text-text-muted uppercase">Severity</Text>
        <View className="flex-row bg-bg-primary border border-border rounded-lg overflow-hidden">
          {['ALL', 'CRITICAL', 'WARNING'].map(s => (
            <TouchableOpacity 
              key={s} 
              onPress={() => setSeverityFilter(s)}
              className={`px-3 py-1.5 ${severityFilter === s ? 'bg-accent' : ''}`}
            >
              <Text className={`text-[10px] font-bold ${severityFilter === s ? 'text-bg-primary' : 'text-text-muted'}`}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <View>
      {/* Header & Search */}
      <View className={`${isDesktop ? 'flex-row' : 'flex-col'} justify-between items-start mb-8 gap-6`}>
        <View>
          <Text className="text-3xl font-black tracking-tighter text-text-primary">INCIDENTS</Text>
          <Text className="mt-1 text-sm font-medium text-text-muted">Audit trail of all detected threats</Text>
        </View>
        
        <View className="flex-row items-center gap-3 w-full lg:w-auto">
          <View className={`${isDesktop ? 'w-80' : 'flex-1'} flex-row items-center bg-bg-secondary border border-border px-4 py-2.5 rounded-xl`}>
            <Ionicons name="search" size={18} color="#8b949e" />
            <TextInput 
              placeholder="Search ID, Type, or IP..."
              placeholderTextColor="#8b949e"
              value={search}
              onChangeText={setSearch}
              className="ml-3 flex-1 text-sm text-text-primary"
              style={{ outlineStyle: 'none' } as any}
            />
          </View>
          
          {isDesktop && (
            <TouchableOpacity className="flex-row items-center bg-border/20 border border-border px-4 py-2.5 rounded-xl">
              <Ionicons name="download-outline" size={18} color="#00d992" />
              <Text className="ml-2 text-xs font-bold text-text-primary uppercase">Export</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Advanced Filters (PC) */}
      {isDesktop && (
        <View className="mb-6 flex-row justify-between items-center bg-bg-secondary p-4 rounded-xl border border-border">
          {renderFilterOptions()}
          <Text className="text-[10px] font-bold text-text-muted">Showing {totalCount} results</Text>
        </View>
      )}
    </View>
  );
}
