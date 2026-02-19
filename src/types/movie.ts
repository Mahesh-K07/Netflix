export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type?: string;
}

export interface MovieDetails extends Movie {
  Genre: string;
  Plot: string;
  Director: string;
  Actors: string;
  imdbRating: string;
  Runtime?: string;
  Released?: string;
  Language?: string;
}

