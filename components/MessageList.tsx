// components/MessageList.tsx
'use client';

import { Message } from '@/types/chat';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

const personaEmojis: Record<string, string> = {
  'default': '🤖',
  'career-coach': '💼',
  'event-planner': '🎉',
  'interviewer': '📝',
  'health-expert': '❤️',
};

const personaNames: Record<string, string> = {
  'default': 'General Assistant',
  'career-coach': 'Career Coach',
  'event-planner': 'Event Planner',
  'interviewer': 'Interviewer',
  'health-expert': 'Health Expert',
};

export default function MessageList({ messages, isLoading }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
        <div className="mb-4 text-6xl">🤖</div>
        <h3 className="text-xl font-medium mb-2">Welcome to AI Chat</h3>
        <p className="max-w-md">Select a mode above and start a conversation. I'm here to help!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg p-4 ${
              message.role === 'user'
                ? 'bg-blue-600 text-white'
                : message.role === 'system' 
                ? 'bg-purple-100 text-purple-800 border border-purple-200'
                : message.isError
                ? 'bg-red-100 text-red-800 border border-red-200'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {/* Persona indicator for assistant messages */}
            {message.role === 'assistant' && message.persona && (
              <div className="flex items-center text-xs font-semibold mb-1">
                <span className="mr-1">{personaEmojis[message.persona]}</span>
                <span>{personaNames[message.persona]}</span>
              </div>
            )}
            
            {/* System message indicator */}
            {message.role === 'system' && (
              <div className="flex items-center text-xs font-semibold mb-1">
                <span className="mr-1">🔔</span>
                <span>System</span>
              </div>
            )}
            
            {/* Error indicator */}
            {message.isError && (
              <div className="flex items-center text-xs font-semibold mb-1">
                <span className="mr-1">⚠️</span>
                <span>Error</span>
              </div>
            )}
            
            {/* Use ReactMarkdown for all assistant responses, plain text for others */}
            {message.role === 'assistant' && !message.isError ? (
              <div className="markdown-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {message.content}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="whitespace-pre-wrap">{message.content}</div>
            )}
            
            <div className={`text-xs mt-1 ${message.role === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
        </div>
      ))}
      
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-gray-100 text-gray-800 rounded-lg p-4 max-w-xs md:max-w-md">
            <div className="flex items-center">
              <div className="flex space-x-1 mr-2">
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <span className="text-sm">Thinking...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}