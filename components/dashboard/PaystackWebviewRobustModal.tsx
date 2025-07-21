import React, { useRef, useState } from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

interface PaystackWebviewRobustModalProps {
  visible: boolean;
  onClose: () => void;
  onComplete: (url: string) => void;
  paystackUrl: string;
  backendDomain?: string;
  paystackRedirectUrl: string;
}

const DEFAULT_BACKEND_DOMAIN = 'api.your-backend.com';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  webviewContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flex: 1,
    minHeight: 500,
    maxHeight: '90%',
  },
  loading: {
    marginTop: 32,
  },
});

const runFirst = `
  document.addEventListener('click', function(e) {
    if (e.target && e.target.innerHTML && e.target.innerHTML.includes('Cancel')) {
      window.ReactNativeWebView.postMessage('cancel');
    }
  });
  true;
`;

const PaystackWebviewRobustModal: React.FC<PaystackWebviewRobustModalProps> = ({
  visible,
  onClose,
  onComplete,
  paystackUrl,
  backendDomain = DEFAULT_BACKEND_DOMAIN,
  paystackRedirectUrl,
}) => {
  const [verified, setVerified] = useState(false);
  const webview = useRef<WebView>(null);

  const handleMessage = (event: any) => {
    if (event.nativeEvent.data === 'cancel') {
      onClose();
    }
  };

  const handleShouldStartLoadWithRequest = (request: any) => {
    const url = request.url;
    // Intercept custom scheme or backend redirects
    if (
      url.startsWith(paystackRedirectUrl) ||
      url.startsWith('eservone://') ||
      (backendDomain && url.includes(backendDomain))
    ) {
      webview.current?.stopLoading();
      if (!verified) {
        setVerified(true);
        onComplete && onComplete(url);
        onClose();
      }
      return false;
    }
    return true;
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 bg-[rgba(0,0,0,0.3)] justify-end">
        <View className="bg-white rounded-t-3xl flex-1 min-h-[500px] max-h-[90%]">
          <WebView
            ref={webview}
            source={{ uri: paystackUrl }}
            injectedJavaScriptBeforeContentLoaded={runFirst}
            onMessage={handleMessage}
            onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
            startInLoadingState
            renderLoading={() => <ActivityIndicator size="large" color="#7C6AED" style={{ marginTop: 32 }} />}
            style={{ flex: 1, borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
            onError={onClose}
            javaScriptEnabled
            domStorageEnabled
            mixedContentMode="always"
            thirdPartyCookiesEnabled
            sharedCookiesEnabled
            allowUniversalAccessFromFileURLs
            scrollEnabled
          />
        </View>
      </View>
    </Modal>
  );
};

export default PaystackWebviewRobustModal; 