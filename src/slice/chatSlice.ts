import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ChatMessageDto, ConnectionStatus } from '../types/chat';
import { executePromise } from '../util/sliceUtil';
import { CommunityAPI } from '../api/CommunityAPI';

// Async thunk for fetching chat history
export const getChatHistoryAsync = createAsyncThunk(
  'chat/getHistory',
  () => executePromise(CommunityAPI.getChatHistory())
);

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
    setMessages: (state, action: PayloadAction<ChatMessageDto[]>) => {
      state.messages = action.payload;
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
  extraReducers: (builder) => {
    builder
      .addCase(getChatHistoryAsync.fulfilled, (state, action) => {
        // The payload is an object like { content: [...] }. Extract the array.
        // Also ensure that if the payload or content is null/undefined, we default to an empty array.
        state.messages = action.payload?.content || [];
      });
  },
});

export const { addMessage, setMessages, setConnectionStatus, setMyChatName, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
