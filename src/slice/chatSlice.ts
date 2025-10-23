import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// chat_guide.md에 정의된 메시지 형식 (DTO)
export interface ChatMessageDto {
  type: 'CHAT' | 'JOIN' | 'LEAVE';
  sender: string;
  content: string;
}

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

interface ChatState {
  messages: ChatMessageDto[];
  connectionStatus: ConnectionStatus;
}

const initialState: ChatState = {
  messages: [],
  connectionStatus: 'disconnected',
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<ChatMessageDto>) => {
      state.messages.push(action.payload);
    },
    setConnectionStatus: (state, action: PayloadAction<ConnectionStatus>) => {
      state.connectionStatus = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { addMessage, setConnectionStatus, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
