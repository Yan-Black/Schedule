import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role } from './modules';

const initialState: Role = { currentRole: 'student' };

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    switchRole: (state: Role, { payload }: PayloadAction<string>) => {
      state.currentRole = payload;
    },
  },
});

export const { switchRole } = roleSlice.actions;
export default roleSlice.reducer;
