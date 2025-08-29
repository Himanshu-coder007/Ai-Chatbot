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
        <div className="text-center p-8">
          <h3 className="text-2xl font-semibold mb-4">Welcome to AI Chat bot</h3>
          <p className="text-gray-600 text-lg">Start a conversation by typing a message below</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-gray-100 rounded-2xl px-5 py-4">
            <LoadingDots />
          </div>
        </div>
      )}
    </div>
  );
}