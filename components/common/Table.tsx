import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * 전역 공통 테이블 컨테이너
 */
export function Table({ children, className = '' }: TableProps) {
  return (
    <View className={`flex-1 bg-bg-secondary border border-border rounded-xl overflow-hidden ${className}`}>
      {children}
    </View>
  );
}

/**
 * 테이블 헤더 영역 (데스크톱 전용)
 */
function Header({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <View className={`flex-row border-b border-border bg-bg-primary px-6 py-4 ${className}`}>
      {children}
    </View>
  );
}

/**
 * 헤더 셀 (제목)
 */
function Head({ children, width = 'flex-1', className = '' }: { children: React.ReactNode; width?: string; className?: string }) {
  return (
    <Text className={`${width} text-[10px] font-bold uppercase tracking-widest text-text-muted ${className}`}>
      {children}
    </Text>
  );
}

/**
 * 테이블 본문 영역 (스크롤 가능, 데이터 없음 처리 포함)
 */
function Body<T>({ 
  data, 
  emptyIcon = 'document-text-outline', 
  emptyText = 'No data found.', 
  renderItem 
}: { 
  data: T[]; 
  emptyIcon?: keyof typeof Ionicons.glyphMap; 
  emptyText?: string;
  renderItem: (item: T, idx: number, isLast: boolean) => React.ReactNode;
}) {
  return (
    <ScrollView className="flex-1">
      {data.length === 0 ? (
        <View className="items-center justify-center py-20">
          <Ionicons name={emptyIcon} size={48} color="#3d3a39" />
          <Text className="mt-4 text-text-muted">{emptyText}</Text>
        </View>
      ) : (
        data.map((item, idx) => renderItem(item, idx, idx === data.length - 1))
      )}
    </ScrollView>
  );
}

/**
 * 테이블 행 (Row) - 클릭 효과 및 하단 테두리 포함
 */
function Row({ 
  children, 
  isLast, 
  onPress, 
  className = '' 
}: { 
  children: React.ReactNode; 
  isLast?: boolean; 
  onPress?: () => void;
  className?: string;
}) {
  const baseClass = `px-6 py-4 flex-row items-center ${!isLast ? 'border-b border-border' : ''} ${onPress ? 'hover:bg-text-primary/[0.02]' : ''} ${className}`;

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} className={baseClass}>
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View className={baseClass}>
      {children}
    </View>
  );
}

/**
 * 테이블 셀 (데이터 영역)
 */
function Cell({ children, width = 'flex-1', className = '' }: { children: React.ReactNode; width?: string; className?: string }) {
  return (
    <View className={`${width} ${className}`}>
      {children}
    </View>
  );
}

// 합성 컴포넌트 등록
Table.Header = Header;
Table.Head = Head;
Table.Body = Body;
Table.Row = Row;
Table.Cell = Cell;
