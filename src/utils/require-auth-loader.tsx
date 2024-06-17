import type { LoaderFunctionArgs } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import { supabase } from './supabase-client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const requireAuthLoader = async ({ request: _ }: LoaderFunctionArgs) => {
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return redirect('/signin');
  }

  return null;
};
