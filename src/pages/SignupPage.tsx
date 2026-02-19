import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { isValidEmail, validatePassword, validateName } from '../utils/validation';

function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

  const validateForm = (): boolean => {
    let isValid = true;
    setNameError(null);
    setEmailError(null);
    setPasswordError(null);

    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    } else {
      const nameValidation = validateName(name);
      if (!nameValidation.isValid) {
        setNameError(nameValidation.error || 'Invalid name');
        isValid = false;
      }
    }

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
    } else {
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        setPasswordError(passwordValidation.errors[0] || 'Invalid password');
        isValid = false;
      }
    }

    return isValid;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setNameError(null);
    setEmailError(null);
    setPasswordError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await signup(name.trim(), email.trim(), password);
      navigate('/', { replace: true });
    } catch (err) {
      const errorMessage = (err as Error).message;
      setError(errorMessage);
      
      // Set field-specific errors if applicable
      if (errorMessage.toLowerCase().includes('name')) {
        setNameError(errorMessage);
      } else if (errorMessage.toLowerCase().includes('email')) {
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
        <h1 className="mb-6 text-2xl font-bold sm:text-3xl">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm text-zinc-200" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameError(null);
                setError(null);
              }}
              className={`w-full rounded bg-zinc-900 px-3 py-2 text-sm text-white outline-none ring-1 transition ${
                nameError
                  ? 'ring-red-500 focus:ring-2 focus:ring-red-500'
                  : 'ring-zinc-700 focus:ring-2 focus:ring-netflixRed'
              }`}
              required
            />
            {nameError && (
              <p className="text-xs text-red-400" role="alert">
                {nameError}
              </p>
            )}
          </div>

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
              autoComplete="new-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(null);
                setError(null);
                setShowPasswordRequirements(true);
              }}
              onFocus={() => setShowPasswordRequirements(true)}
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
            {showPasswordRequirements && !passwordError && (
              <div className="rounded-md bg-zinc-900/50 p-2 text-xs text-zinc-400">
                <p className="mb-1 font-semibold text-zinc-300">
                  Password must contain:
                </p>
                <ul className="ml-4 list-disc space-y-0.5">
                  <li className={password.length >= 8 ? 'text-green-400' : ''}>
                    At least 8 characters
                  </li>
                  <li className={/[A-Z]/.test(password) ? 'text-green-400' : ''}>
                    One uppercase letter
                  </li>
                  <li className={/[a-z]/.test(password) ? 'text-green-400' : ''}>
                    One lowercase letter
                  </li>
                  <li className={/[0-9]/.test(password) ? 'text-green-400' : ''}>
                    One number
                  </li>
                  <li
                    className={
                      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
                        ? 'text-green-400'
                        : ''
                    }
                  >
                    One special character
                  </li>
                </ul>
              </div>
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
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-sm text-zinc-300">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-white hover:underline"
          >
            Sign in.
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;

