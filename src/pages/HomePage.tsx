import { useState } from 'react';
import { HeroBanner } from '../components/HeroBanner';
import { MovieRow } from '../components/MovieRow';
import { SearchBar } from '../components/SearchBar';
import { DEFAULT_ROWS } from '../utils/constants';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { useMovies } from '../hooks/useMovies';
import { MovieCard } from '../components/MovieCard';
import { SkeletonCard } from '../components/SkeletonCard';

function HomePage() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, 500);
  const {
    movies: searchResults,
    loading: searchLoading,
    error: searchError,
  } = useMovies(debouncedSearch);

  const showSearchSection = Boolean(debouncedSearch.trim());

  return (
    <div className="space-y-6">
      <HeroBanner />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-white sm:text-xl">
          Browse movies
        </h2>
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {showSearchSection && (
        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-zinc-100 sm:text-lg">
            Search results for &quot;{debouncedSearch}&quot;
          </h2>
          <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-2 sm:gap-4">
            {searchLoading &&
              Array.from({ length: 6 }).map((_, idx) => (
                <SkeletonCard key={idx} />
              ))}

            {!searchLoading && searchResults.length > 0 && (
              <>
                {searchResults.map((movie) => (
                  <MovieCard key={movie.imdbID} movie={movie} />
                ))}
              </>
            )}

            {!searchLoading && !searchResults.length && !searchError && (
              <p className="text-sm text-zinc-400">No movies found.</p>
            )}

            {searchError && (
              <p className="text-sm text-red-400">{searchError}</p>
            )}
          </div>
        </section>
      )}

      <div className="space-y-6">
        {DEFAULT_ROWS.map((row) => (
          <MovieRow key={row.title} title={row.title} query={row.query} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;

