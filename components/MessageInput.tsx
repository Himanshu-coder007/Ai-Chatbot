// components/MessageInput.tsx
'use client';

import { useState, KeyboardEvent, useRef, useEffect } from 'react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
  selectedPersona: string;
  onPersonaChange: (persona: string) => void;
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

export default function MessageInput({ onSendMessage, disabled, selectedPersona, onPersonaChange }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [recognitionError, setRecognitionError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const interimTranscriptRef = useRef('');

  useEffect(() => {
    // Check if the browser supports the Web Speech API
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setSpeechSupported(false);
      return;
    }

    try {
      // Initialize speech recognition
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        interimTranscriptRef.current = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscriptRef.current += transcript;
          }
        }

        if (finalTranscript) {
          setMessage(prev => prev + (prev ? ' ' : '') + finalTranscript.trim());
        }
        setRecognitionError(null);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        interimTranscriptRef.current = '';
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setRecognitionError(`Error: ${event.error}`);
        setIsListening(false);
        interimTranscriptRef.current = '';
      };

      recognitionRef.current.onnomatch = () => {
        setRecognitionError('No speech was recognized. Please try again.');
      };
    } catch (error) {
      console.error('Failed to initialize speech recognition', error);
      setSpeechSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      setRecognitionError(null);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !disabled) {
      try {
        setRecognitionError(null);
        recognitionRef.current.start();
        setIsListening(true);
        interimTranscriptRef.current = '';
      } catch (error) {
        console.error('Error starting speech recognition', error);
        setRecognitionError('Failed to start voice recognition. Please try again.');
        setIsListening(false);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-end gap-2">
        <div className="flex-1 border border-gray-300 rounded-lg bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent text-black">
          <div className="flex items-center px-3 py-2 border-b border-gray-200">
            <span className="text-sm font-medium text-gray-700 mr-2">Mode:</span>
            <span className="text-lg mr-1">{personaEmojis[selectedPersona]}</span>
            <select 
              value={selectedPersona} 
              onChange={(e) => onPersonaChange(e.target.value)}
              className="text-sm bg-transparent border-none focus:outline-none focus:ring-0 py-0"
              disabled={disabled}
            >
              <option value="default">General Assistant</option>
              <option value="career-coach">Career Coach</option>
              <option value="event-planner">Event Planner</option>
              <option value="interviewer">Interviewer</option>
              <option value="health-expert">Health Expert</option>
            </select>
          </div>
          <textarea
            value={message + (interimTranscriptRef.current ? ' ' + interimTranscriptRef.current : '')}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message or use voice input..."
            className="w-full px-3 py-2 resize-none border-none focus:outline-none"
            rows={1}
            disabled={disabled}
          />
        </div>
        
        {speechSupported && (
          <button
            onClick={toggleListening}
            disabled={disabled}
            className={`p-3 rounded-lg transition-colors cursor-pointer ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            } disabled:bg-gray-300 disabled:cursor-not-allowed`}
            type="button"
            title={isListening ? 'Stop recording' : 'Start voice recording'}
          >
            <MicrophoneIcon isListening={isListening} />
          </button>
        )}
        
        <button
          onClick={handleSend}
          disabled={disabled || !message.trim()}
          className="bg-blue-600 text-white p-3 rounded-lg disabled:bg-blue-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors cursor-pointer"
          type="button"
        >
          <SendIcon />
        </button>
      </div>
      
      {recognitionError && (
        <div className="mt-2 text-sm text-red-500 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {recognitionError}
        </div>
      )}
      
      {isListening && (
        <div className="mt-2 flex items-center">
          <div className="flex space-x-1 items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <span className="text-sm text-gray-600 ml-2">Listening... Speak now</span>
        </div>
      )}
      
      {!speechSupported && (
        <div className="mt-2 text-sm text-amber-600 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Voice input is not supported in your browser. Try Chrome or Edge.
        </div>
      )}
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

function MicrophoneIcon({ isListening }: { isListening: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
    >
      {isListening ? (
        // Stop icon (square)
        <rect x="6" y="6" width="12" height="12" />
      ) : (
        // Microphone icon
        <>
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
        </>
      )}
    </svg>
  );
}