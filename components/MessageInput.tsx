'use client';

import { useState, KeyboardEvent } from 'react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

export default function MessageInput({ onSendMessage, disabled }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-2 max-w-2xl mx-auto">
      <div className="flex-1 border border-gray-300 rounded-lg bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent text-black">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="w-full px-3 py-2 resize-none border-none focus:outline-none"
          rows={1}
          disabled={disabled}
        />
      </div>
      <button
        onClick={handleSend}
        disabled={disabled || !message.trim()}
        className="bg-blue-600 text-white p-3 rounded-lg disabled:bg-blue-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors cursor-pointer"
      >
        <SendIcon />
      </button>
    </div>
  );
}

function SendIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
    </svg>
  );
}