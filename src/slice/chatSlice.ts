import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// chat_guide.md에 정의된 메시지 형식 (DTO)
export interface ChatMessageDto {
  type: 'CHAT' | 'JOIN' | 'LEAVE';
  sender: string;
  content: string;
}

interface ChatState {
  messages: ChatMessageDto[];
}

const initialState: ChatState = {
  messages: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<ChatMessageDto>) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { addMessage, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
