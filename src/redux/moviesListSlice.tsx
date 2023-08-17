import { createSlice } from '@reduxjs/toolkit';
import { Movie } from '../components/MovieCard';

interface MoviesListState {
  data: Movie[]
}

const initialState: MoviesListState = {
  data: [],
}

export const moviesListSlice = createSlice({
  name: 'moviesList',
  initialState,
  reducers: {
    setMovies: (state , action) => {
      state.data = [...action.payload]
    },
  },
})

export const { setMovies } = moviesListSlice.actions

export default moviesListSlice.reducer