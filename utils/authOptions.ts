export function isValidCredentials(credentials: Partial<Record<"email" | "password", unknown>>): boolean {
    return credentials.email !== undefined && credentials.password !== undefined;
}
