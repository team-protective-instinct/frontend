import Markdown from 'react-native-markdown-display';

interface MarkdownTextProps {
  children: string;
  muted?: boolean;
}

export function MarkdownText({ children, muted = false }: MarkdownTextProps) {
  const bodyColor = muted ? '#d0d0d0' : '#f2f2f2';

  return (
    <Markdown
      style={{
        body: {
          color: bodyColor,
          fontSize: 14,
          lineHeight: 22,
        },
        paragraph: {
          marginTop: 0,
          marginBottom: 8,
        },
        bullet_list: {
          marginBottom: 8,
        },
        ordered_list: {
          marginBottom: 8,
        },
        list_item: {
          color: bodyColor,
          marginBottom: 4,
        },
        strong: {
          color: '#ffffff',
          fontWeight: '800',
        },
        em: {
          color: bodyColor,
          fontStyle: 'italic',
        },
        code_inline: {
          color: '#00d992',
          backgroundColor: '#101010',
          borderRadius: 4,
          paddingHorizontal: 4,
          paddingVertical: 2,
        },
        fence: {
          color: '#d0d0d0',
          backgroundColor: '#101010',
          borderColor: '#3d3a39',
          borderWidth: 1,
          borderRadius: 8,
          padding: 10,
        },
        heading1: {
          color: '#f2f2f2',
          fontSize: 18,
          fontWeight: '900',
          marginBottom: 8,
        },
        heading2: {
          color: '#f2f2f2',
          fontSize: 16,
          fontWeight: '900',
          marginBottom: 8,
        },
        heading3: {
          color: '#f2f2f2',
          fontSize: 14,
          fontWeight: '900',
          marginBottom: 6,
        },
      }}>
      {children}
    </Markdown>
  );
}
