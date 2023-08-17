import { configureStore } from '@reduxjs/toolkit';
import moviesListReducer from './moviesListSlice';

export const store = configureStore({
  reducer: {
    moviesList: moviesListReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch