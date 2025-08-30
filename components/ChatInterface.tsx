'use client';

import { useState, useRef, useEffect } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import PersonaSelector from './PersonaSelector';
import { Message } from '@/types/chat';

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState('default');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string, persona: string = selectedPersona) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: content,
          persona: persona 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        role: 'assistant',
        timestamp: new Date(),
        persona: persona,
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: error instanceof Error ? error.message : 'Sorry, I encountered an error. Please try again.',
        role: 'assistant',
        timestamp: new Date(),
        isError: true,
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePersonaChange = (persona: string) => {
    setSelectedPersona(persona);
    
    // Add a system message when changing personas
    const personaNames: Record<string, string> = {
      'default': 'General Assistant',
      'career-coach': 'Career Coach',
      'event-planner': 'Event Planner',
      'interviewer': 'Interviewer',
      'health-expert': 'Health Expert'
    };
    
    const systemMessage: Message = {
      id: `system-${Date.now()}`,
      content: `Switched to ${personaNames[persona]} mode. How can I help you?`,
      role: 'system',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, systemMessage]);
  };

  return (
    <div className="flex flex-col h-full w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b border-gray-200">
        <PersonaSelector 
          selectedPersona={selectedPersona} 
          onPersonaChange={handlePersonaChange} 
        />
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <MessageList messages={messages} isLoading={isLoading} />
        <div ref={messagesEndRef} />
      </div>
      <div className="p-6 border-t border-gray-200">
        <MessageInput 
          onSendMessage={(message) => handleSendMessage(message, selectedPersona)} 
          disabled={isLoading} 
          selectedPersona={selectedPersona}
          onPersonaChange={handlePersonaChange}
        />
      </div>
    </div>
  );
}