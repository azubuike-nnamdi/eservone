import React from 'react';
import { ActivityIndicator, Modal, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

interface PaystackWebviewModalProps {
  visible: boolean;
  onClose: () => void;
  paystackUrl: string;
  callbackUrl?: string;
  onResult?: (status: 'success' | 'failure', reference?: string) => void;
}

const PaystackWebviewModal: React.FC<PaystackWebviewModalProps> = ({ visible, onClose, paystackUrl, callbackUrl = 'eservone://payment/thank-you', onResult }) => {
  const closedRef = React.useRef(false);

  const handleWebViewNav = (navState: any) => {
    if (closedRef.current) return;
    const url = navState.url;
    if (url.includes('thank-you') || url.startsWith(callbackUrl)) {
      closedRef.current = true;
      onClose();
      if (onResult) onResult('success');
    } else if (url.includes('failed')) {
      closedRef.current = true;
      onClose();
      if (onResult) onResult('failure');
    }
  };

  React.useEffect(() => { closedRef.current = false; }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'flex-end' }}>
        <View style={{ backgroundColor: 'white', borderTopLeftRadius: 24, borderTopRightRadius: 24, flex: 1, minHeight: 500, maxHeight: '90%' }}>
          {paystackUrl ? (
            <WebView
              source={{ uri: paystackUrl }}
              onNavigationStateChange={handleWebViewNav}
              startInLoadingState
              renderLoading={() => <ActivityIndicator size="large" color="#7C6AED" style={{ marginTop: 32 }} />}
              style={{ flex: 1, borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
              onError={e => console.log('WebView error:', e.nativeEvent)}
            />
          ) : (
            <Text style={{ textAlign: 'center', marginTop: 32, color: 'red' }}>No Paystack URL provided</Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default PaystackWebviewModal; 