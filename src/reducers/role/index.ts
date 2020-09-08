import { createSlice } from '@reduxjs/toolkit';
import { Role } from './modules';

const initialState: Role = { currentRole: 'student' };

const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        switchRole: (state: Role) => {
            state.currentRole = state.currentRole === 'student' ? 'mentor' : 'student'
        }
    }
})

export const { switchRole } = roleSlice.actions;
export default roleSlice.reducer;
