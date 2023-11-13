import { createSlice } from '@reduxjs/toolkit';

export const OpenSlice = createSlice({
  name: 'OpenSlice',
  initialState: {
    isMapOpen: false,
    isEventOpen: false,
  },
  reducers: {
    setMapOpen: (state) => {
      state.isMapOpen = true;
    },
    setMapClose: (state) => {
      state.isMapOpen = false;
    },
    setEventOpen: (state) => {
      state.isEventOpen = true;
    },
    setEventClose: (state) => {
      state.isEventOpen = false;
    },
  },
});

export const { setMapOpen, setMapClose, setEventOpen, setEventClose } =
  OpenSlice.actions;
export default OpenSlice.reducer;
