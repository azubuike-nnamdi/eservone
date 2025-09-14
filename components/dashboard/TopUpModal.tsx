import React from 'react';
import { Animated, Easing, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Button from '../common/button';
import KeyboardAwareScrollView from '../common/keyboard-aware-scroll-view';

interface TopUpModalProps {
  visible: boolean;
  onClose: () => void;
  amount: string;
  setAmount: (val: string) => void;
  onTopUp: () => void;
  isPending: boolean;
}

const slideAnim = new Animated.Value(0);

const TopUpModal: React.FC<TopUpModalProps> = ({ visible, onClose, amount, setAmount, onTopUp, isPending }) => {
  React.useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.3)',
          justifyContent: 'flex-end',
          transform: [{
            translateY: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [600, 0],
            })
          }],
        }}
      >
        <View className="bg-white rounded-t-2xl p-6 pb-12">
          <Text className="text-lg font-bold mb-4 text-center">Top Up Account</Text>

          <KeyboardAwareScrollView className="flex-1" keyboardVerticalOffset={100}>
            <TextInput
              placeholder="Amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={val => {
                // Only allow numbers (and optionally a single dot for decimals)
                if (/^\d*\.?\d*$/.test(val)) {
                  setAmount(val);
                }
              }}
              className="border border-gray-200 rounded-lg px-4 py-3 mb-6"
            />
          </KeyboardAwareScrollView>

          <Button
            onPress={onTopUp}
            disabled={!amount || isPending}
            loading={isPending}
            loadingText="Processing..."
          >
            <Text className="text-white text-center font-bold text-lg">Top Up</Text>
          </Button>
          <TouchableOpacity onPress={onClose} className="mt-4">
            <Text className="text-center text-gray-400">Cancel</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default TopUpModal; 