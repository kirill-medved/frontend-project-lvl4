import { createSlice } from '@reduxjs/toolkit';

const channelsReducer = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
  },
  reducers: {
    setChannels(state, action) {
      state.channels = action.payload;
    },
  },
});

// Destructure and export the plain action creators
export const { setChannels } = channelsReducer.actions;

export default channelsReducer.reducer;

// Define a thunk that dispatches those action creators
// const fetchUsers = () => async (dispatch) => {
//   dispatch(usersLoading());
//   const response = await usersAPI.fetchAll();
//   dispatch(usersReceived(response.data));
// };
