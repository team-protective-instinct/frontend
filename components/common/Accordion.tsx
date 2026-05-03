import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, withTiming, useDerivedValue } from 'react-native-reanimated';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  isOpenInitial?: boolean;
}

/**
 * Accordion 컴포넌트
 *
 * 용도: 상세 정보 화면에서 긴 내용(예: 원시 로그, AI 추론 과정 등)을
 * 접었다 펴서 화면 공간을 효율적으로 관리할 때 사용합니다.
 */
export function Accordion({ title, children, isOpenInitial = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(isOpenInitial);

  // 0(닫힘)에서 1(열림) 사이의 애니메이션 값을 생성합니다.
  const progress = useDerivedValue(() =>
    isOpen ? withTiming(1, { duration: 300 }) : withTiming(0, { duration: 300 })
  );

  // 화살표 아이콘 회전 스타일 (0도 -> 180도)
  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * 180}deg` }],
  }));

  // 내용 영역의 투명도 스타일
  const contentStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    display: progress.value === 0 && !isOpen ? 'none' : 'flex',
  }));

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View className="mb-4 overflow-hidden rounded-lg border border-[#3d3a39] bg-[#050507]">
      {/* 클릭 가능한 헤더 영역 */}
      <TouchableOpacity
        onPress={toggleAccordion}
        className="flex-row items-center justify-between bg-[#101010] px-4 py-3"
        activeOpacity={0.7}>
        <Text className="text-xs font-bold uppercase tracking-widest text-[#f2f2f2]">{title}</Text>
        <Animated.View style={iconStyle}>
          <Ionicons name="chevron-down" size={16} color="#8b949e" />
        </Animated.View>
      </TouchableOpacity>

      {/* 애니메이션이 적용된 내용 영역 */}
      <Animated.View style={contentStyle} className="border-t border-[#3d3a39]">
        <View className="bg-[#050507] p-4">{children}</View>
      </Animated.View>
    </View>
  );
}
