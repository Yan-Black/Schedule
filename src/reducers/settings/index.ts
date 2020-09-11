import { createSlice } from '@reduxjs/toolkit';
import { EventSettings, Settings } from './models';

const initialState: Settings = {
  view: 'List',
  time: 'UTC−12:00',
  meeting: 'Online and Offline',
  merge: false,
  visual: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeSettings: (state, { payload }) => {
      const { event, value }: EventSettings = payload;
      state[event] = value;
    },
  },
});

export const { changeSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
