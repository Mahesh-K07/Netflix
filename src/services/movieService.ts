import api from './api';
import type { Movie, MovieDetails } from '../types/movie';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export async function searchMovies(query: string): Promise<Movie[]> {
  if (!query.trim()) return [];

  const response = await api.get('', {
    params: {
      apikey: API_KEY,
      s: query,
      type: 'movie',
    },
  });

  if (response.data.Response === 'False') {
    throw new Error(response.data.Error || 'No movies found');
  }

  return (response.data.Search || []) as Movie[];
}

export async function getMovieDetails(imdbID: string): Promise<MovieDetails> {
  const response = await api.get('', {
    params: {
      apikey: API_KEY,
      i: imdbID,
      plot: 'full',
    },
  });

  if (response.data.Response === 'False') {
    throw new Error(response.data.Error || 'Movie not found');
  }

  return response.data as MovieDetails;
}

