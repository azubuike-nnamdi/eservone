import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface PrivacyConsentModalProps {
  visible: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export const PrivacyConsentModal: React.FC<PrivacyConsentModalProps> = ({
  visible,
  onAccept,
  onDecline,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDecline}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.content}>
            <Text style={styles.title}>Privacy & Analytics</Text>
            <Text style={styles.message}>
              We would like to collect anonymous usage data to improve our app.
              This helps us understand how features are used and fix issues.
            </Text>
            <Text style={styles.subMessage}>
              • No personal information is collected{'\n'}
              • Data is anonymized and aggregated{'\n'}
              • You can change this setting anytime{'\n'}
              • All data collection is optional
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.declineButton]}
                onPress={onDecline}
              >
                <Text style={styles.declineButtonText}>No Thanks</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.acceptButton]}
                onPress={onAccept}
              >
                <Text style={styles.acceptButtonText}>Help Improve App</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 20,
    maxWidth: 400,
    width: '90%',
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    color: '#666',
    marginBottom: 16,
  },
  subMessage: {
    fontSize: 14,
    color: '#888',
    lineHeight: 20,
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  declineButton: {
    backgroundColor: '#F2F2F7',
  },
  declineButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
  acceptButton: {
    backgroundColor: '#007AFF',
  },
  acceptButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
