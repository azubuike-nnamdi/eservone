import ToastNotification, { ToastType } from '@/components/common/toast-notification';
import React, { createContext, useCallback, useContext, useState } from 'react';

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: 'success' as ToastType,
  });

  const showToast = useCallback((message: string, type: ToastType) => {
    setToast({
      visible: true,
      message,
      type,
    });
  }, []);

  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, visible: false }));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <ToastNotification
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onHide={hideToast}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}; 