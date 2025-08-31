'use client';

import { Message } from '@/types/chat';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MessageBubbleProps {
  message: Message;
}

const personaNames: Record<string, string> = {
  'default': 'General Assistant',
  'career-coach': 'Career Coach',
  'event-planner': 'Event Planner',
  'interviewer': 'Interviewer',
  'health-expert': 'Health Expert',
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getFileIcon = (type: string): string => {
  if (type.startsWith('image/')) return '🖼️';
  if (type === 'application/pdf') return '📄';
  if (type.startsWith('text/')) return '📝';
  return '📎';
};

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} my-2`}>
      <div
        className={`rounded-2xl px-5 py-4 max-w-3xl ${
          isUser
            ? 'bg-blue-600 text-white'
            : isSystem
            ? 'bg-purple-100 text-purple-800'
            : message.isError
            ? 'bg-red-100 text-red-800 border border-red-200'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        {/* File attachment */}
        {message.file && (
          <div className="mb-3 p-2 bg-white bg-opacity-20 rounded-lg">
            <div className="flex items-center">
              <span className="text-lg mr-2">{getFileIcon(message.file.type)}</span>
              <div>
                <p className="text-sm font-medium">{message.file.name}</p>
                <p className="text-xs opacity-80">{formatFileSize(message.file.size)}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Message content */}
        {message.role === 'assistant' && !message.isError ? (
          <div className="markdown-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{message.content}</p>
        )}
        
        {/* Persona indicator */}
        {message.persona && (
          <div className="mt-2 text-xs opacity-70 italic">
            {personaNames[message.persona]}
          </div>
        )}
        
        {/* Timestamp */}
        <div className={`text-xs mt-2 ${isUser ? 'text-blue-200' : 'text-gray-500'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}