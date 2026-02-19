import { ChangeEvent } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: Props) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="w-full max-w-xl">
      <label className="flex items-center gap-3 rounded-md bg-zinc-900/70 px-3 py-2 text-sm text-zinc-400 ring-1 ring-zinc-700 focus-within:ring-2 focus-within:ring-netflixRed sm:px-4 sm:py-2.5">
        <span className="hidden text-xs uppercase tracking-[0.2em] text-zinc-500 sm:inline">
          Search
        </span>
        <input
          type="text"
          placeholder="Search for a movie (e.g. Batman, Avengers)..."
          value={value}
          onChange={handleChange}
          className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none sm:text-base"
        />
      </label>
    </div>
  );
}

