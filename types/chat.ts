export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
  file?: {
    name: string;
    type: string;
    size: number;
  };
  persona?: string;
  isError?: boolean;
}