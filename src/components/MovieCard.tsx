import { useNavigate } from 'react-router-dom';
import type { Movie } from '../types/movie';
import placeholderPoster from '../assets/placeholder-poster.svg';

interface Props {
  movie: Movie;
}

export function MovieCard({ movie }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.imdbID}`);
  };

  const poster =
    !movie.Poster || movie.Poster === 'N/A' ? placeholderPoster : movie.Poster;

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group relative w-40 shrink-0 cursor-pointer overflow-hidden rounded-md bg-zinc-900/80 transition hover:-translate-y-1 hover:scale-105 hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-netflixRed sm:w-48"
    >
      <div className="aspect-[2/3] w-full overflow-hidden">
        <img
          src={poster}
          alt={movie.Title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-2 text-left text-xs sm:p-3 sm:text-sm">
        <p className="line-clamp-1 font-semibold text-white">{movie.Title}</p>
        <p className="mt-0.5 text-[11px] text-zinc-300 sm:text-xs">
          {movie.Year}
        </p>
      </div>
    </button>
  );
}

