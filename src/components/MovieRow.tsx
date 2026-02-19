import type { Movie } from '../types/movie';
import { useMovies } from '../hooks/useMovies';
import { MovieCard } from './MovieCard';
import { SkeletonCard } from './SkeletonCard';

interface Props {
  title: string;
  query: string;
}

export function MovieRow({ title, query }: Props) {
  const { movies, loading, error } = useMovies(query);

  return (
    <section className="space-y-2">
      <h2 className="text-sm font-semibold text-zinc-100 sm:text-lg">
        {title}
      </h2>
      <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-2 sm:gap-4">
        {loading &&
          Array.from({ length: 6 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}

        {!loading && movies.length > 0 && (
          <>
            {movies.map((movie: Movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </>
        )}

        {!loading && !movies.length && !error && (
          <p className="text-sm text-zinc-400">No movies found.</p>
        )}

        {error && (
          <p className="text-sm text-red-400">
            {error === 'No movies found' ? 'No movies found.' : error}
          </p>
        )}
      </div>
    </section>
  );
}

