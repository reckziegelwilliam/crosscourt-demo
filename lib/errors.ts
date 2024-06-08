export interface BaseError extends Error {
    type: string;
    statusCode?: number;
    details?: string;
  }
  
  export interface AuthError extends BaseError {
    type: 'auth';
    digest?: string;
  }
  
  export interface NetworkError extends BaseError {
    type: 'network';
    statusCode: number;
  }
  
  export interface ValidationError extends BaseError {
    type: 'validation';
    field?: string;
  }
  
  export type AppError = AuthError | NetworkError | ValidationError;
  
  // Helper function to create specific error types
  export function createError(
    type: 'auth' | 'network' | 'validation',
    message: string,
    statusCode?: number,
    details?: string,
    field?: string
  ): AppError {
    const baseError = new Error(message);
    baseError.name = type.charAt(0).toUpperCase() + type.slice(1) + 'Error';
  
    switch (type) {
      case 'auth':
        return { ...baseError, type, statusCode, details };
      case 'network':
        return { ...baseError, type, statusCode: statusCode || 500, details };
      case 'validation':
        return { ...baseError, type, field, statusCode: statusCode || 400, details };
      default:
        return { ...baseError, type: 'network', statusCode: statusCode || 500, details };
    }
  }


export function getErrorDetails(error: any): string {
    return error.meta?.cause || 'Unknown error';
  }
  