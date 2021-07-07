import { createSlice } from '@reduxjs/toolkit';

const channelsReducer = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: null,
  },
  reducers: {
    setChannels(state, action) {
      state.channels = action.payload;
    },
    setCurrentChannelId(state, action) {
      state.currentChannelId = action.payload;
    },
    addNewChannel(state, action) {
      state.channels.push(action.payload);
    },
  },
});

// Destructure and export the plain action creators
export const { setChannels, setCurrentChannelId, addNewChannel } =
  channelsReducer.actions;

export default channelsReducer.reducer;

// Define a thunk that dispatches those action creators
// const fetchUsers = () => async (dispatch) => {
//   dispatch(usersLoading());
//   const response = await usersAPI.fetchAll();
//   dispatch(usersReceived(response.data));
// };
