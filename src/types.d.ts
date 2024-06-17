/* eslint-disable @typescript-eslint/ban-types */

import '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';

declare global {
  type Prettify<T> = {
    [K in keyof T]: T[K] extends object ? Prettify<T[K]> : T[K];
  } & {};
}

declare module '@tanstack/react-query' {
  interface Register {
    mutationMeta: {
      invalidates?: Array<QueryKey>;
      operation?: 'INSERT' | 'UPDATE' | 'DELETE';
    };
  }
}

export {};
