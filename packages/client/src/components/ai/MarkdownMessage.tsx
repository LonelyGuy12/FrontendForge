import { Check } from 'lucide-react';

interface MarkdownMessageProps {
  content: string;
}

export function MarkdownMessage({ content }: MarkdownMessageProps) {
  // Parse the message into text segments and code blocks
  // Parse the message into text segments and code blocks
  // Looking for: **`filename`** (or similar) followed by ```lang ... ```
  const segments: Array<{ type: 'text' | 'code'; content?: string; filename?: string | null; language?: string; code?: string }> = [];
  const regex = /(?:\*\*\`?([^\`\n]+)\`?\*\*\s*\n)?```(\w*)\n([\s\S]*?)```/g;
  
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(content)) !== null) {
    // Add preceding text
    if (match.index > lastIndex) {
      segments.push({
        type: 'text',
        content: content.slice(lastIndex, match.index),
      });
    }

    segments.push({
      type: 'code',
      filename: match[1] || null,
      language: match[2] || 'text',
      code: match[3].trim(),
    });

    lastIndex = regex.lastIndex;
  }

  // Add remaining text
  if (lastIndex < content.length) {
    segments.push({
      type: 'text',
      content: content.slice(lastIndex),
    });
  }

  return (
    <div className="space-y-3">
      {segments.map((segment, i) => {
        if (segment.type === 'text') {
          return (
            <div key={i} className="whitespace-pre-wrap break-words text-sm">
              {segment.content}
            </div>
          );
        }

        return (
          <div key={i} className="flex items-center gap-1.5 py-1.5 px-3 bg-primary/10 text-primary border border-primary/20 rounded-md w-fit text-xs font-medium my-2">
            <Check className="w-3.5 h-3.5" />
            Applied changes to {segment.filename || 'active file'}
          </div>
        );
      })}
    </div>
  );
}
