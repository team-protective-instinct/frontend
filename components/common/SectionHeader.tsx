import { Text } from 'react-native';

interface SectionHeaderProps {
  title: string;
  isDesktop: boolean;
}

export function SectionHeader({ title, isDesktop }: SectionHeaderProps) {
  return (
    <Text
      className={`mb-4 text-xs font-bold uppercase tracking-widest text-[#94A3B8] ${isDesktop ? '' : 'px-4'}`}>
      {title}
    </Text>
  );
}
