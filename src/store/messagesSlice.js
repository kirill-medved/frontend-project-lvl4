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
      state.messages.filter((m) => {
        console.log(m.channelId);
        console.log(typeof m.channelId);
        console.log(action.payload);
        console.log(typeof action.payload);
        console.log(m.channelId !== action.payload);
        return m.channelId !== action.payload;
      });
    },
  },
});

// Destructure and export the plain action creators
export const { setMessages, sendMessage, filterChannelMessages } =
  messagesReducer.actions;

export default messagesReducer.reducer;
