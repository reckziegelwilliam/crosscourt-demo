'use client';

import { useEffect } from 'react';

interface AuthErrorProps {
  error: (Error & { digest?: string }) | null;
}

export default function AuthError({ error }: AuthErrorProps) {
  useEffect(() => {
    if (error) {
      console.error('Authentication Error:', error);
    }
  }, [error]);

  if (!error) {
    return null;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold">Authentication Error</h3>
      <p>{error.message}</p>
      {error.digest && <p>Reference: {error.digest}</p>}
    </div>
  );
}
