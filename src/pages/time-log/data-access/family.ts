import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from '@/utils/supabase-client';

const getFamilies = async () => {
  const response = await supabase.from('family_surname').select('*');

  return response;
};

const addFamily = async (name: string) => {
  const response = await supabase
    .from('family_surname')
    .insert({ surname: name });

  return response;
};

export const useGetFamilies = () =>
  useQuery({
    queryKey: ['families'],
    queryFn: getFamilies,
    retry: false,
    enabled: false,
  });

export const useAddFamily = () =>
  useMutation({
    mutationFn: addFamily,
    retry: false,
  });
