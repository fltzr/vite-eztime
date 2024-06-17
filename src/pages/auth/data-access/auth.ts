import type { SignInWithPasswordCredentials } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';
import { supabase } from '../../../utils/supabase-client';

const submitSignIn = async (data: SignInWithPasswordCredentials) => {
  const signInResponse = await supabase.auth.signInWithPassword(data);

  return signInResponse;
};

export const useSubmitSignin = () =>
  useMutation({
    mutationKey: ['mutation__sign-in'],
    mutationFn: submitSignIn,
    retry: false,
  });
