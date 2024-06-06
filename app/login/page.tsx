'use client';

import Link from 'next/link';
import { Form } from '@/components/shared/form';
import { signIn } from '@/lib/auth';
import { SubmitButton } from '@/components/shared/submit-button';
import { ErrorAlert } from '@/components/shared/error-alert';
import { AppError } from '@/lib/errors';
import { useState } from 'react';

export default function Login() {
  const [error, setError] = useState<AppError | null>(null);

  const handleSubmit = async (formData: FormData) => {
    try {
      await signIn('credentials', {
        redirectTo: '/protected',
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      });
    } catch (err: any) {
      setError({
        ...err,
        type: 'auth',
        message: err.message || 'Authentication failed',
      });
    }
  };

  return (
    <>
      <ErrorAlert error={error} reset={() => setError(null)} />
      <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
        <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
            <h3 className="text-xl font-semibold">Sign In</h3>
            <p className="text-sm text-gray-500">
              Use your email and password to sign in
            </p>
          </div>
          <Form action={handleSubmit}>
            <SubmitButton>Sign in</SubmitButton>
            <p className="text-center text-sm text-gray-600">
              {"Don't have an account? "}
              <Link href="/register" className="font-semibold text-gray-800">
                Sign up
              </Link>
              {' for free.'}
            </p>
          </Form>
        </div>
      </div>
    </>
  );
}
