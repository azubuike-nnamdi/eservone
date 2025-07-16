import React, { useRef } from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';
import { WebView } from 'react-native-webview';

interface PaystackWebviewRobustModalProps {
  visible: boolean;
  onClose: () => void;
  onComplete: (url: string) => void;
  paystackUrl: string;
  backendDomain?: string; // e.g., 'api.your-backend.com'
}

const DEFAULT_BACKEND_DOMAIN = 'api.your-backend.com'; // Change this to your backend domain

const PaystackWebviewRobustModal: React.FC<PaystackWebviewRobustModalProps> = ({
  visible,
  onClose,
  onComplete,
  paystackUrl,
  backendDomain = DEFAULT_BACKEND_DOMAIN,
}) => {
  const verified = useRef(false);

  const runFirst = `
    document.addEventListener('click', function(e) {
      if (e.target && e.target.innerHTML && e.target.innerHTML.includes('Cancel')) {
        window.ReactNativeWebView.postMessage('cancel');
      }
    });
    true;
  `;

  const handleMessage = (event: any) => {
    if (event.nativeEvent.data === 'cancel') {
      onClose();
    }
  };

  const handleNavChange = (navState: any) => {
    if (verified.current) return;
    const url = navState.url;
    if (url.includes(backendDomain)) {
      verified.current = true;
      onComplete && onComplete(url);
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'flex-end' }}>
        <View style={{ backgroundColor: 'white', borderTopLeftRadius: 24, borderTopRightRadius: 24, flex: 1, minHeight: 500, maxHeight: '90%' }}>
          <WebView
            source={{ uri: paystackUrl }}
            injectedJavaScriptBeforeContentLoaded={runFirst}
            onMessage={handleMessage}
            onNavigationStateChange={handleNavChange}
            startInLoadingState
            renderLoading={() => <ActivityIndicator size="large" color="#7C6AED" style={{ marginTop: 32 }} />}
            style={{ flex: 1, borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
            onError={e => {
              onClose();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default PaystackWebviewRobustModal; 