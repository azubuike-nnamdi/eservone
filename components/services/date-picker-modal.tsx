import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from 'react-native-calendars';

interface DatePickerModalProps {
  visible: boolean;
  selectedDate: Date;
  onClose: () => void;
  onDateSelect: (dateString: string) => void;
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({
  visible,
  selectedDate,
  onClose,
  onDateSelect,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="flex-1 bg-white rounded-t-3xl p-6 max-h-96">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold">Select Date</Text>
            <TouchableOpacity onPress={onClose}>
              <Text className="text-primary-300 font-semibold">Cancel</Text>
            </TouchableOpacity>
          </View>

          {/* Calendar Picker */}
          <Calendar
            onDayPress={(day: { dateString: string }) => onDateSelect(day.dateString)}
            markedDates={{
              [selectedDate.toISOString().split('T')[0]]: {
                selected: true,
                selectedColor: '#6366F1'
              }
            }}
            minDate={new Date().toISOString().split('T')[0]}
          />
        </View>
      </View>
    </Modal>
  );
};

export default DatePickerModal;
