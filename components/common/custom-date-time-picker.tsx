import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, {
   DateTimePickerEvent
} from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import { Modal, Platform, Pressable, Text, View } from 'react-native';

interface CustomDateTimePickerProps {
   value?: Date | null;
   onChange?: (date: Date) => void;
   placeholder?: string;
   containerClassName?: string;
   error?: string;
   maximumDate?: Date;
   minimumDate?: Date;
   rightIcon?: keyof typeof Ionicons.glyphMap;
   label?: string;
}

export default function CustomDateTimePicker({
   value = null,
   onChange,
   placeholder = 'Select Date',
   containerClassName = '',
   error,
   maximumDate,
   minimumDate,
   rightIcon = 'chevron-down-outline',
   label
}: CustomDateTimePickerProps) {
   const [showPicker, setShowPicker] = useState(false);
   const [internalDate, setInternalDate] = useState<Date | null>(value);

   // Sync internal date with prop value
   useEffect(() => {
      setInternalDate(value);
   }, [value]);

   const formatDateDisplay = (date: Date | null): string => {
      if (!date) return '';
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
   };

   const handleDateSelection = (
      event: DateTimePickerEvent,
      selectedDate?: Date
   ) => {
      if (Platform.OS === 'android') {
         setShowPicker(false);
      }

      if (event.type === 'dismissed') {
         if (Platform.OS === 'android') {
            return;
         }
         setShowPicker(false);
         return;
      }

      if (selectedDate) {
         setInternalDate(selectedDate);
         onChange?.(selectedDate);
         // On iOS, don't close immediately - let user confirm with Done button
      }
   };

   const handlePress = () => {
      setShowPicker(true);
   };

   const handleDone = () => {
      // Ensure the current date is saved when Done is pressed
      if (internalDate && onChange) {
         onChange(internalDate);
      }
      setShowPicker(false);
   };

   const displayValue = internalDate ? formatDateDisplay(internalDate) : '';
   const displayText = displayValue || placeholder;
   const textColor = internalDate ? '#1F2937' : '#A3A3A3';

   return (
      <View className={containerClassName}>
         {label && (
            <Text className="mb-2 text-base font-medium text-gray-700">
               {label}
            </Text>
         )}
         <Pressable
            onPress={handlePress}
            className={`flex-row items-center rounded-lg border bg-white px-4 py-4 ${error ? 'border-red-500' : 'border-gray-300'}`}
         >
            <Text
               className="flex-1 text-base"
               style={{
                  color: textColor,
                  fontSize: 16,
                  lineHeight: 20
               }}
            >
               {displayText}
            </Text>
            {rightIcon && (
               <Ionicons name={rightIcon} size={20} color="#737373" />
            )}
         </Pressable>
         {error && <Text className="mt-1 text-sm text-red-500">{error}</Text>}

         {/* Android: Modal picker */}
         {showPicker && Platform.OS === 'android' && (
            <DateTimePicker
               value={internalDate || new Date()}
               mode="date"
               display="default"
               onChange={handleDateSelection}
               maximumDate={maximumDate}
               minimumDate={minimumDate}
            />
         )}

         {/* iOS: Modal with picker */}
         {showPicker && Platform.OS === 'ios' && (
            <Modal
               transparent
               animationType="slide"
               visible={showPicker}
               onRequestClose={handleDone}
            >
               <View className="flex-1 justify-end bg-black/50">
                  <View className="rounded-t-3xl bg-white">
                     {/* Header */}
                     <View className="flex-row items-center justify-between border-b border-gray-200 px-4 py-4">
                        <Pressable onPress={handleDone}>
                           <Text className="text-base text-primary-400">
                              Cancel
                           </Text>
                        </Pressable>
                        <Text className="text-2xl font-semibold text-gray-900">
                           Select Date
                        </Text>
                        <Pressable onPress={handleDone}>
                           <Text className="text-base font-semibold text-primary-400">
                              Done
                           </Text>
                        </Pressable>
                     </View>

                     {/* Picker */}
                     <View className="w-full items-center overflow-hidden p-8">
                        <DateTimePicker
                           value={internalDate || new Date()}
                           mode="date"
                           display="inline"
                           onChange={handleDateSelection}
                           maximumDate={maximumDate}
                           minimumDate={minimumDate}
                           style={{ height: 200, width: '100%' }}
                        />
                     </View>
                  </View>
               </View>
            </Modal>
         )}
      </View>
   );
}
