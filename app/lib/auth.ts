// lib/auth.ts
import postgres from 'postgres';
import { supabase } from './supabaseClient';
import { users } from '../seed/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function signUpWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
}

export async function getSession() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  console.log(session);

  if (error) throw error;
  return session;
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function verifyLogin(email: string, password: string) {
  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  console.log('Matched user:', user); 

  return user || null;
}
