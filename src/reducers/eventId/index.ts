import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  eventId: '',
  isOpen: false,
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
    },
  },
});

export const { setEventPageId, closeEventPage } = eventPageSlice.actions;
export default eventPageSlice.reducer;
