import { betterAuth } from 'better-auth';

// Define the Auth type so TS knows signUp/signIn exist
export type AuthType = {
  signUp: (data: { email: string; password: string }) => Promise<{ user: { id: string } }>;
  signIn: (data: { email: string; password: string }) => Promise<{ id: string }>;
  // add more methods if needed
};

// Create and export the auth instance
export const auth: AuthType = betterAuth({
  adapter: 'sqlite',
  database: './betterauth.db',
  apiKey: 'YOUR_API_KEY',
}) as unknown as AuthType; // cast so TS recognizes methods
