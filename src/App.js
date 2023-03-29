import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Router from './routes';
// theme
import ThemeProvider from './theme';
// auth
import { AuthProvider } from './hooks/useAuth';
// Snackbar
import { SnackbarProvider } from './hooks/useSnackbar';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
// ----------------------------------------------------------------------

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnmount: true,
      refetchOnReconnect: true,
      retry: 1,
      staleTime: 5 * 1000,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <BrowserRouter>
          <ThemeProvider>
            <SnackbarProvider>
              <AuthProvider>
                <ScrollToTop />
                <StyledChart />
                <Router />
                <ReactQueryDevtools initialIsOpen={false} />
              </AuthProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    </QueryClientProvider>
  );
}
