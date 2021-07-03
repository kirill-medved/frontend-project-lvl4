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
  },
});

// Destructure and export the plain action creators
export const { setMessages, sendMessage } = messagesReducer.actions;

export default messagesReducer.reducer;
