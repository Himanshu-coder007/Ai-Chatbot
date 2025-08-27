import { Message } from '@/types/chat';
import MessageBubble from './MessageBubble';
import LoadingDots from './LoadingDots';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <div className="text-center p-6">
          <h3 className="text-xl font-semibold mb-2">Welcome to Gemini Chat</h3>
          <p className="text-gray-600">Start a conversation by typing a message below</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-xs">
            <LoadingDots />
          </div>
        </div>
      )}
    </div>
  );
}