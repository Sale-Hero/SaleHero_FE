export enum MessageType {
  CHAT = 'CHAT',
  JOIN = 'JOIN',
  LEAVE = 'LEAVE',
  SYSTEM = 'SYSTEM',
}

export interface ChatMessageDto {
  type: MessageType;
  sender: string | null;
  content: string;
  createdAt?: string;
  sessionId?: string;
}

export enum ConnectionStatus {
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  ERROR = 'error',
}
