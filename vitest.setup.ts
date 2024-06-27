import '@testing-library/jest-dom/vitest';
import { config } from '@vue/test-utils';
import 'vitest';
import { QueryClient, VUE_QUERY_CLIENT } from '@tanstack/vue-query';

config.global.provide = {
  [VUE_QUERY_CLIENT]: new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  }),
};
