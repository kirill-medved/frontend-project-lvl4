import { configureStore } from '@reduxjs/toolkit';

import { messagesSlice, channelsSlice } from './slices';

messagesSlice;
const store = configureStore({
  reducer: {
    channels: messagesSlice,
    messages: channelsSlice,
  },
});

export default store;
