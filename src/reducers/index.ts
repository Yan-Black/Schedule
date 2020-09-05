import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Init } from './models';

const appSlice = createSlice({
  name: 'app',
  initialState: false,
  reducers: {
    init: (state, { payload: { init } }: PayloadAction<Init>) => init,
  },
});

export default appSlice.reducer;
