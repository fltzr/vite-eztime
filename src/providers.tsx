import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './components/auth-provider';
import { router } from './routes';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/query-client';

export const Providers = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  );
};
