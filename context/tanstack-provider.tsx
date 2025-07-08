import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { AuthProvider } from './auth-context';
import { CurrencyProvider } from './currency-context';
import { ToastProvider } from './toast-context';

const TanstackProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <AuthProvider>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <CurrencyProvider>
            {children}
          </CurrencyProvider>
        </QueryClientProvider>
      </ToastProvider>
    </AuthProvider>
  );
};

export default TanstackProvider;

