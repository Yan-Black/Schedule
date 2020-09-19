import { createSlice } from '@reduxjs/toolkit';
import { EventSettings, Settings } from './models';

const firstState: Settings = {
  time: 'Europe/London',
  meeting: 'Online and Offline',
  merge: false,
  visual: false,
};

const currentState = localStorage.getItem('settings');

const initialState: Settings =
  currentState === null ? firstState : <Settings>JSON.parse(currentState);

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
