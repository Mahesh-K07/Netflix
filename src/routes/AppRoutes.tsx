import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Loader } from '../components/Loader';
import { ProtectedRoute } from './ProtectedRoute';

const LoginPage = lazy(() => import('../pages/LoginPage'));
const SignupPage = lazy(() => import('../pages/SignupPage'));
const HomePage = lazy(() => import('../pages/HomePage'));
const MovieDetailsPage = lazy(() => import('../pages/MovieDetailsPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

export function AppRoutes() {
  return (
    <div className="min-h-screen bg-netflixDark text-white">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pb-10 pt-4 sm:px-8 sm:pt-6">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<ProtectedRoute />}>
              <Route index element={<HomePage />} />
              <Route path="movie/:id" element={<MovieDetailsPage />} />
            </Route>

            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            <Route path="/not-found" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default AppRoutes;

