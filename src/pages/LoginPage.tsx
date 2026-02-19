import { FormEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { isValidEmail } from '../utils/validation';

interface LocationState {
  from?: { pathname?: string };
}

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    let isValid = true;
    setEmailError(null);
    setPasswordError(null);

    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 4) {
      setPasswordError('Password must be at least 4 characters');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setEmailError(null);
    setPasswordError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await login(email.trim(), password);
      const redirectTo = state?.from?.pathname || '/';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const errorMessage = (err as Error).message;
      setError(errorMessage);
      
      // Set field-specific errors if applicable
      if (errorMessage.toLowerCase().includes('email')) {
        setEmailError(errorMessage);
      } else if (errorMessage.toLowerCase().includes('password')) {
        setPasswordError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <div className="w-full max-w-md rounded-md bg-black/80 p-6 shadow-xl ring-1 ring-zinc-800 sm:p-8">
        <h1 className="mb-6 text-2xl font-bold sm:text-3xl">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm text-zinc-200" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(null);
                setError(null);
              }}
              className={`w-full rounded bg-zinc-900 px-3 py-2 text-sm text-white outline-none ring-1 transition ${
                emailError
                  ? 'ring-red-500 focus:ring-2 focus:ring-red-500'
                  : 'ring-zinc-700 focus:ring-2 focus:ring-netflixRed'
              }`}
              required
            />
            {emailError && (
              <p className="text-xs text-red-400" role="alert">
                {emailError}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-zinc-200" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(null);
                setError(null);
              }}
              className={`w-full rounded bg-zinc-900 px-3 py-2 text-sm text-white outline-none ring-1 transition ${
                passwordError
                  ? 'ring-red-500 focus:ring-2 focus:ring-red-500'
                  : 'ring-zinc-700 focus:ring-2 focus:ring-netflixRed'
              }`}
              required
            />
            {passwordError && (
              <p className="text-xs text-red-400" role="alert">
                {passwordError}
              </p>
            )}
          </div>

          {error && (
            <p className="text-sm text-red-400" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex w-full items-center justify-center rounded bg-netflixRed px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-800"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-sm text-zinc-300">
          New to Netfix?{' '}
          <Link
            to="/signup"
            className="font-semibold text-white hover:underline"
          >
            Sign up now.
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;

