/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const channelsReducer = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: null,
    currentChannelName: null,
  },
  reducers: {
    setChannels(state, action) {
      state.channels = action.payload;
    },
    setCurrentChannelId(state, action) {
      state.currentChannelId = action.payload;
    },
    setCurrentChannelName(state, action) {
      state.currentChannelName = action.payload;
    },
    addNewChannel(state, action) {
      state.channels.push(action.payload);
    },
    filterChannelUsers(state, action) {
      const newChannels = state.channels.filter((c) => c.id !== action.payload);
      state.channels = newChannels;
    },
    renameChannel(state, action) {
      const channel = state.channels.find((c) => c.id === action.payload.id);
      if (!channel) return;
      channel.name = action.payload.name;
    },
  },
});

// Destructure and export the plain action creators
export const {
  setChannels,
  setCurrentChannelId,
  addNewChannel,
  filterChannelUsers,
  renameChannel,
  setCurrentChannelName,
} = channelsReducer.actions;

export default channelsReducer.reducer;

// Define a thunk that dispatches those action creators
// const fetchUsers = () => async (dispatch) => {
//   dispatch(usersLoading());
//   const response = await usersAPI.fetchAll();
//   dispatch(usersReceived(response.data));
// };
