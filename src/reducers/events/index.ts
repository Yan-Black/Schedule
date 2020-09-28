import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { recountDate } from 'helpers';
import fetchStudyEvents, { postEvent } from 'requests';
import { InitialStudyEventState, StudyEvent } from './models';

const initialState: InitialStudyEventState = {
  data: [],
  loading: true,
  isLoading: false,
  error: null,
  favourite: false,
};

const eventsSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    deleteEvent: (state, { payload }: PayloadAction<number>) => {
      state.data.splice(payload, 1);
    },
    changeEvent: (
      state,
      {
        payload,
      }: PayloadAction<{ changedEvent: StudyEvent; changedInd: number }>,
    ) => {
      state.data.splice(payload.changedInd, 1, payload.changedEvent);
    },
    updateEventsTime: (state, { payload }: PayloadAction<string>) => {
      state.data.forEach(recountDate.bind(null, payload));
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
    builder.addCase(postEvent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postEvent.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.data.push(payload);
    });
    builder.addCase(postEvent.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
  },
});

export const {
  deleteEvent,
  changeEvent,
  updateEventsTime,
} = eventsSlice.actions;
export default eventsSlice.reducer;
