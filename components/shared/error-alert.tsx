'use client';

import { useEffect } from 'react';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { AppError } from '@/lib/errors';

interface ErrorAlertProps {
  error: AppError | null;
  reset: () => void;
}

export function ErrorAlert({ error, reset }: ErrorAlertProps) {
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      let title = 'An error occurred';
      let description = error.message || '';
      let actionText = 'Try again';

      switch (error.type) {
        case 'auth':
          title = 'Authentication Error';
          description = 'There was a problem with your login request.';
          break;
        case 'network':
          title = 'Network Error';
          description = `Network error: ${error.statusCode}`;
          break;
        case 'validation':
          title = 'Validation Error';
          description = `Validation failed for ${error.field}`;
          break;
        default:
          description =  '';
      }

      toast({
        variant: 'destructive',
        title,
        description,
        action: <ToastAction altText={actionText} onClick={reset}>{actionText}</ToastAction>,
      });
    }
  }, [error, reset, toast]);

  return null;
}
