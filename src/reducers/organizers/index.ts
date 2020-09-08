import { createSlice } from '@reduxjs/toolkit';
import { fetchOrganizres } from 'requests';
import { InitialOrganizerState } from './models';

const initialState: InitialOrganizerState = {
  data: [],
  loading: false,
  error: null,
};

const organizersSlice = createSlice({
  name: 'organizers',
  initialState,
  reducers: {
    deleteOrganizer: (state, { payload }) => {
      state.data.splice(payload, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrganizres.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOrganizres.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    });
    builder.addCase(fetchOrganizres.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { deleteOrganizer } = organizersSlice.actions;
export default organizersSlice.reducer;
