import { createSlice } from '@reduxjs/toolkit';
import {ModalWindow} from './modules';


const initialState: ModalWindow = { 
    visibility: false,
    type: 'none'
};

const modalSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    hideModal: (state: ModalWindow) => {
      state.visibility = false;
    },
    showDownloadModal: (state: ModalWindow) => {
      state.type = 'download';
      state.visibility = true;
    }
  },
});

export const { hideModal, showDownloadModal } = modalSlice.actions;
export default modalSlice.reducer;
