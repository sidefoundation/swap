import '@/styles/global.css';

import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import Layout from '@/components/Layout';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="data-theme">
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
