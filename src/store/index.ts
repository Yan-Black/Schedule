import { configureStore } from '@reduxjs/toolkit';
import appReducer from 'reducers/app';
import eventsReducer from 'reducers/events';

const store = configureStore({
  reducer: {
    app: appReducer,
    events: eventsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
