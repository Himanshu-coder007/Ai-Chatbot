'use client';

import { Message } from '@/types/chat';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

const personaNames: Record<string, string> = {
  'default': 'General Assistant',
  'career-coach': 'Career Coach',
  'event-planner': 'Event Planner',
  'interviewer': 'Interviewer',
  'health-expert': 'Health Expert',
};

export default function MessageList({ messages, isLoading }: MessageListProps) {
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

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-xs lg:max-w-md xl:max-w-lg 2xl:max-w-xl rounded-lg p-4 ${
              message.role === 'user'
                ? 'bg-blue-600 text-white'
                : message.isError
                ? 'bg-red-100 text-red-800 border border-red-200'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {message.file && (
              <div className="mb-2 p-2 bg-white text-black bg-opacity-20 rounded">
                <div className="flex items-center">
                  <span className="text-lg mr-2">{getFileIcon(message.file.type)}</span>
                  <div>
                    <p className="text-sm font-medium">{message.file.name}</p>
                    <p className="text-xs opacity-80">{formatFileSize(message.file.size)}</p>
                  </div>
                </div>
              </div>
            )}
            
            {message.role === 'assistant' ? (
              <div className="markdown-content">
                <ReactMarkdown
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '');
                      const language = match ? match[1] : '';
                      
                      return !inline && language ? (
                        <SyntaxHighlighter
                          style={vscDarkPlus}
                          language={language}
                          PreTag="div"
                          className="rounded-md"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            ) : (
              <p className="whitespace-pre-wrap">{message.content}</p>
            )}
            
            {message.persona && (
              <div className="mt-1 text-xs opacity-70">
                {personaNames[message.persona]}
              </div>
            )}
            
            <div className="text-xs opacity-70 mt-1">
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
        </div>
      ))}
      
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-gray-100 text-gray-800 rounded-lg p-4 max-w-xs lg:max-w-md xl:max-w-lg 2xl:max-w-xl">
            <div className="flex items-center">
              <div className="animate-pulse mr-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              </div>
              <div className="animate-pulse mr-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <div className="animate-pulse">
                <div className="w-2 h-2 bg-gray-400 rounded-full" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}