import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ChatMessageDto, ConnectionStatus } from '../types/chat';
import { executePromise } from '../util/sliceUtil';
import { CommunityAPI } from '../api/CommunityAPI';

// Async thunk for fetching chat history
export const getChatHistoryAsync = createAsyncThunk(
  'chat/getHistory',
  (page: number) => executePromise(CommunityAPI.getChatHistory(page))
);

interface ChatState {
  messages: ChatMessageDto[];
  connectionStatus: ConnectionStatus;
  myChatName: string | null;
  currentPage: number;
  totalPages: number;
  isLoadingHistory: boolean;
}

const initialState: ChatState = {
  messages: [],
  connectionStatus: ConnectionStatus.DISCONNECTED,
  myChatName: null,
  currentPage: 0,
  totalPages: 0,
  isLoadingHistory: false,
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
      state.currentPage = 0;
      state.totalPages = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChatHistoryAsync.pending, (state) => {
        state.isLoadingHistory = true;
      })
      .addCase(getChatHistoryAsync.fulfilled, (state, action) => {
        const { content, totalPages } = action.payload;
        const history = (content || []).reverse();

        state.messages = [...history, ...state.messages];
        state.totalPages = totalPages;
        state.currentPage = action.meta.arg;
        state.isLoadingHistory = false;
      })
      .addCase(getChatHistoryAsync.rejected, (state) => {
        state.isLoadingHistory = false;
      });
  },
});

export const { addMessage, setMessages, setConnectionStatus, setMyChatName, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
