import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatMessageDto, ConnectionStatus } from '../types/chat';

interface ChatState {
  messages: ChatMessageDto[];
  connectionStatus: ConnectionStatus;
  myChatName: string | null;
}

const initialState: ChatState = {
  messages: [],
  connectionStatus: ConnectionStatus.DISCONNECTED,
  myChatName: null,
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
    setMyChatName: (state, action: PayloadAction<string | null>) => {
      state.myChatName = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
      state.myChatName = null;
    },
  },
});

export const { addMessage, setConnectionStatus, setMyChatName, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
