import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LoadingSpinner } from './SkeletonLoader';

export const ProtectedRoute = ({ children }) => {
  const { user, token, loading, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner text="Verifying admin credentials..." />;
  }

  if (!token || !user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center bg-cream-soft">
        <div className="max-w-md bg-white p-8 rounded-3xl shadow-soft border border-cocoa/10">
          <h2 className="font-display text-2xl font-bold text-red-600 mb-2">Access Unauthorized</h2>
          <p className="font-sans text-xs sm:text-sm text-cocoa/75 mb-6">
            You are logged in as <strong>{user.email}</strong>, which does not have administrator privileges.
          </p>
          <a
            href="/"
            className="btn-primary"
          >
            Return to Store
          </a>
        </div>
      </div>
    );
  }

  return children;
};
