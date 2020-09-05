import { configureStore } from '@reduxjs/toolkit';
import appReducer from 'reducers';

const reducer = {
  app: appReducer,
};

const store = configureStore({
  reducer,
});

export default store;
