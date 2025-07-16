import * as Linking from 'expo-linking';
import React, { createContext, useContext, useEffect, useRef } from 'react';

interface DeepLinkContextType {
  registerHandler: (handler: (url: string) => void) => void;
}

const DeepLinkContext = createContext<DeepLinkContextType>({
  registerHandler: () => { },
});

export const DeepLinkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const handlerRef = useRef<((url: string) => void) | null>(null);

  useEffect(() => {
    const handleDeepLink = (event: { url: string }) => {
      if (handlerRef.current) handlerRef.current(event.url);
    };
    const subscription = Linking.addEventListener('url', handleDeepLink);
    Linking.getInitialURL().then((url) => {
      if (url && handlerRef.current) handlerRef.current(url);
    });
    return () => {
      subscription.remove();
    };
  }, []);

  const registerHandler = (handler: (url: string) => void) => {
    handlerRef.current = handler;
  };

  return (
    <DeepLinkContext.Provider value={{ registerHandler }}>
      {children}
    </DeepLinkContext.Provider>
  );
};

export const useDeepLink = () => useContext(DeepLinkContext); 