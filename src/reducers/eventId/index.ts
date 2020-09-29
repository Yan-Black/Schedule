import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  eventId: '',
  isOpen: false,
  isEditMode: false,
};

const eventPageSlice = createSlice({
  name: 'eventId',
  initialState,
  reducers: {
    setEventPageId: (state, { payload }: PayloadAction<string>) => {
      state.eventId = payload;
      state.isOpen = true;
    },
    closeEventPage: (state) => {
      state.isOpen = false;
      state.eventId = '';
      state.isEditMode = false;
    },
    enableEditMode: (state) => {
      state.isEditMode = true;
    },
    disableEditMode: (state) => {
      state.isEditMode = false;
    },
  },
});

export const {
  setEventPageId,
  closeEventPage,
  enableEditMode,
  disableEditMode,
} = eventPageSlice.actions;
export default eventPageSlice.reducer;
