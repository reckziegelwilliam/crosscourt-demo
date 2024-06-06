export type AuthError = Error & { type: 'auth'; digest?: string };
export type NetworkError = Error & { type: 'network'; statusCode?: number };
export type ValidationError = Error & { type: 'validation'; field?: string };

export type AppError = AuthError | NetworkError | ValidationError;
