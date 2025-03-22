import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { AuthProvider } from './auth-context';
import { AuthTokenSetter } from './auth-token-setter';
import { UserProvider } from './user-context';
const TanstackProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient()
  return (
    <AuthProvider>
      <AuthTokenSetter />
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default TanstackProvider;

