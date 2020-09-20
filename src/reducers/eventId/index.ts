import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  eventId: '',
  isOpen: false,
  taskType: '',
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
    setTaskType: (state, { payload }: PayloadAction<string>) => {
      state.taskType = payload;
    },
  },
});

export const {
  setEventPageId,
  closeEventPage,
  setTaskType,
} = eventPageSlice.actions;
export default eventPageSlice.reducer;
