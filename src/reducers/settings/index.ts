import { createSlice } from '@reduxjs/toolkit';
import { EventSettings, Settings } from './models';

const initialState: Settings = {
  time: 'UTC−12:00',
  meeting: 'Online and Offline',
  merge: false,
  visual: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeSettings: (state, action: { payload: EventSettings }) => {
      const { event, value } = action.payload;
      state[event] = value;
    },
  },
});

export const { changeSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
