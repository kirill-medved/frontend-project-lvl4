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
  },
});

// Destructure and export the plain action creators
export const { setMessages } = messagesReducer.actions;

export default messagesReducer.reducer;
