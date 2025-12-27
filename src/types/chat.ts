// types/chat.ts
export interface Message {
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
  isLoading?: boolean;
  error?: boolean;
}

export interface ChatHistoryResponse {
  status: number;
  data: {
    messages: Message[];
    hasMore: boolean;
    total: number;
  };
  message: string;
}

export interface ChatResponse {
  status: number;
  data: {
    reply: string;
  };
  message: string;
}

export interface ChatConfig {
  baseUrl: string;
  sessionId: string;
  initialMessage?: string;
}

export interface ChatTheme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  userBubble: string;
  assistantBubble: string;
}

export type ChatPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';