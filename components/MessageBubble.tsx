// components/MessageBubble.tsx
'use client';

import { Message } from '@/types/chat';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`rounded-2xl px-4 py-3 max-w-3xl ${
          isUser
            ? 'bg-blue-600 text-white'
            : message.isError
            ? 'bg-red-100 text-red-800'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        {message.role === 'assistant' && !message.isError ? (
          <div className="markdown-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{message.content}</p>
        )}
        <p className={`text-xs mt-2 ${isUser ? 'text-blue-200' : 'text-gray-500'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}