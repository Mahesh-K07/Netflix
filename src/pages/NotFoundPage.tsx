import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold sm:text-4xl">Lost your way?</h1>
      <p className="mt-3 max-w-md text-sm text-zinc-300 sm:text-base">
        Sorry, we can&apos;t find the page you&apos;re looking for. You can go
        back to the homepage and continue browsing movies.
      </p>
      <Link
        to="/"
        className="mt-6 rounded bg-netflixRed px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
      >
        Go to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;

