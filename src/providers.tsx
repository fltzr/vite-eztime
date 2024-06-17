import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { router } from '@/routes';
import { queryClient } from '@/utils/query-client';
import { AuthProvider } from '@/components/auth-provider';

export const Providers = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <RouterProvider router={router} />
        </TooltipProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
};
