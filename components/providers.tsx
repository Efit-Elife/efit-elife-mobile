import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { QueryProvider } from "./query-provider";
import { GluestackUIProvider } from "./ui/gluestack-ui-provider";
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/store';
import { FoodLoggingModal } from '@/features/food/components/FoodLoggingModal';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <ReduxProvider store={store}>
        <GluestackUIProvider mode="system">
          <QueryProvider>
            {children}
            <FoodLoggingModal />
          </QueryProvider>
        </GluestackUIProvider>
      </ReduxProvider>
    </ClerkProvider>
  );
};
