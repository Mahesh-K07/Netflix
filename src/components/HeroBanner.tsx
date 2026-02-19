export function HeroBanner() {
  return (
    <section className="relative mb-6 overflow-hidden rounded-lg bg-hero-gradient">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7991379/pexels-photo-7991379.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-40" />
      <div className="relative z-10 flex flex-col gap-4 px-4 py-16 sm:px-10 sm:py-24 lg:max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-400 sm:text-sm">
          Unlimited movies, shows &amp; more
        </p>
        <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
          Watch anything you love, anytime.
        </h1>
        <p className="max-w-xl text-sm text-zinc-200 sm:text-base">
          Discover popular titles, search for your favourites, and dive into
          detailed information about every movie. All powered by the OMDB API.
        </p>
        <div className="mt-1 flex flex-wrap gap-3">
          <button
            type="button"
            className="flex items-center gap-2 rounded bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200 sm:px-6 sm:py-2.5"
          >
            Start watching
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded bg-zinc-700/70 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-zinc-600/80 sm:px-6 sm:py-2.5"
          >
            More info
          </button>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-netflixDark to-transparent" />
    </section>
  );
}

