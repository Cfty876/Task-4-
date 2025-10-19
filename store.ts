import { configureStore } from '@reduxjs/toolkit';
import groupsReducer from './slices/groupsSlice';
import studentsReducer from './slices/studentsSlice';

export const store = configureStore({
  reducer: {
    groups: groupsReducer,
    students: studentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
