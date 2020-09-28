import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCoords } from 'requests';

const initialState = {
  lat: 0,
  lng: 0,
  isLoading: true,
  err: '' as string | unknown,
};

const coordsSlice = createSlice({
  name: 'eventCoords',
  initialState,
  reducers: {
    updateCoords: (
      state,
      { payload }: PayloadAction<{ lat: number; lng: number }>,
    ) => {
      state.lat = payload.lat;
      state.lng = payload.lng;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCoords.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchCoords.fulfilled,
      (state, { payload }: PayloadAction<{ lat: number; lng: number }>) => {
        state.lat = payload.lat;
        state.lng = payload.lng;
        state.isLoading = false;
      },
    );
    builder.addCase(
      fetchCoords.rejected,
      (state, { payload }: PayloadAction<string | unknown>) => {
        state.isLoading = false;
        state.err = payload;
      },
    );
  },
});

export const { updateCoords } = coordsSlice.actions;
export default coordsSlice.reducer;
