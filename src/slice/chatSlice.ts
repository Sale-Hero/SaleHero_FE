import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatMessageDto, ConnectionStatus } from '../types/chat';

interface ChatState {
  messages: ChatMessageDto[];
  connectionStatus: ConnectionStatus;
}

const initialState: ChatState = {
  messages: [],
  connectionStatus: ConnectionStatus.DISCONNECTED,
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
