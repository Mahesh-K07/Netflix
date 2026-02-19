import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage =
    location.pathname === '/login' || location.pathname === '/signup';

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-800 bg-gradient-to-b from-black/90 via-black/80 to-transparent">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8">
        <Link to={isAuthenticated ? '/' : '/login'} className="flex items-center">
          <span className="text-2xl font-extrabold tracking-tight text-netflixRed sm:text-3xl">
            NETFIX
          </span>
        </Link>

        <div className="flex items-center gap-3 text-sm sm:gap-4">
          {isAuthenticated && user ? (
            <>
              <span className="hidden text-zinc-200 sm:inline">
                Hi, <span className="font-semibold">{user.name}</span>
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded bg-netflixRed px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700 sm:px-4 sm:text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            !isAuthPage && (
              <Link
                to="/login"
                className="rounded bg-netflixRed px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700 sm:px-4 sm:text-sm"
              >
                Sign In
              </Link>
            )
          )}
        </div>
      </nav>
    </header>
  );
}

