import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectMail: null,
  isOpen: false,
};

const composeSlice = createSlice({
  name: 'compose',
  initialState,
  reducers: {
    openCompose: (state) => {
      state.isOpen = true;
    },
    closeCompose: (state) => {
      state.isOpen = false;
    },
    selectedMail: (state, action) => {
      state.selectMail = action.payload;
    }
  },
});

export const { openCompose, closeCompose, selectedMail } = composeSlice.actions;


export default composeSlice.reducer;
