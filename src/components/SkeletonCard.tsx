export function SkeletonCard() {
  return (
    <div className="relative w-40 shrink-0 cursor-pointer overflow-hidden rounded-md bg-zinc-800/80 sm:w-48">
      <div className="aspect-[2/3] animate-pulse bg-zinc-700" />
    </div>
  );
}

