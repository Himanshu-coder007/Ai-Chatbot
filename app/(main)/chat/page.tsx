import ChatInterface from '@/components/ChatInterface';

export default function ChatPage() {
  return (
    <div className="container mx-auto px-4 py-8 h-[calc(100vh-4rem)]">
      <div className="h-full">
        <ChatInterface />
      </div>
    </div>
  );
}