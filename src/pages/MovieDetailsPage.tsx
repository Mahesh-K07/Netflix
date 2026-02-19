import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import type { MovieDetails } from '../types/movie';
import { getMovieDetails } from '../services/movieService';
import placeholderPoster from '../assets/placeholder-poster.svg';

function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    async function fetch() {
      setLoading(true);
      setError(null);

      try {
        const data = await getMovieDetails(id);
        if (!cancelled) {
          setMovie(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError((err as Error).message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetch();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const poster =
    !movie?.Poster || movie.Poster === 'N/A'
      ? placeholderPoster
      : movie.Poster;

  if (loading) {
    return (
      <div className="mt-10 flex justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-red-600 border-t-transparent" />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="mt-10 space-y-4 text-center">
        <p className="text-lg text-red-400">
          {error || 'Movie details could not be loaded.'}
        </p>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded bg-zinc-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-600"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="mt-4 grid gap-6 md:grid-cols-[minmax(0,260px)_minmax(0,1fr)]">
      <div className="overflow-hidden rounded-md bg-zinc-900">
        <img
          src={poster}
          alt={movie.Title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold sm:text-3xl">{movie.Title}</h1>
          <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-300">
            <span>{movie.Year}</span>
            {movie.Runtime && (
              <>
                <span className="text-zinc-500">•</span>
                <span>{movie.Runtime}</span>
              </>
            )}
            {movie.Genre && (
              <>
                <span className="text-zinc-500">•</span>
                <span>{movie.Genre}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="rounded bg-yellow-500/20 px-2 py-1 font-semibold text-yellow-400">
            IMDb {movie.imdbRating || 'N/A'}
          </span>
          {movie.Released && (
            <span className="text-zinc-300">Released {movie.Released}</span>
          )}
        </div>

        <p className="text-sm leading-relaxed text-zinc-200 sm:text-base">
          {movie.Plot}
        </p>

        <dl className="grid gap-3 text-sm text-zinc-200 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Director
            </dt>
            <dd className="mt-1">{movie.Director}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Actors
            </dt>
            <dd className="mt-1">{movie.Actors}</dd>
          </div>
          {movie.Language && (
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Language
              </dt>
              <dd className="mt-1">{movie.Language}</dd>
            </div>
          )}
        </dl>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded bg-netflixRed px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Play
          </button>
          <Link
            to="/"
            className="rounded bg-zinc-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-600"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsPage;

