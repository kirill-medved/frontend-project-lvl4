import { createSlice } from '@reduxjs/toolkit';

const messagesReducer = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    setMessages(state, action) {
      state.messages = action.payload;
    },
    sendMessage(state, action) {
      state.messages.push(action.payload);
    },
    filterChannelMessages(state, action) {
      state.messages.filter((m) => m.channelId !== action.payload);
    },
  },
});

// Destructure and export the plain action creators
export const { setMessages, sendMessage, filterChannelMessages } =
  messagesReducer.actions;

export default messagesReducer.reducer;
