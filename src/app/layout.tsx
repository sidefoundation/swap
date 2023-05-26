'use client';

import '@/styles/global.css';

import { ThemeProvider } from 'next-themes';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import Layout from '@/components/Layout';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <html lang="en" data-lpignore>
      <head>
        <title>Side</title>
        <meta name="description" content="Side chain swap" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="data-theme">
            <Layout>{children}</Layout>
            <Toaster />
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
