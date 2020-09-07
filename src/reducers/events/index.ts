import { createSlice } from '@reduxjs/toolkit';
import fetchStudyEvents from 'requests';
import { InitiaiStudyEventState } from './models';

const initialState: InitiaiStudyEventState = {
  data: [],
  loading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    deleteEvent: (state, { payload }) => {
      state.data.splice(payload, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStudyEvents.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchStudyEvents.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    });
    builder.addCase(fetchStudyEvents.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { deleteEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
