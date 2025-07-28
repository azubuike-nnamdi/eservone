import { DeleteAccountModalProps } from "@/constants/types"
import { Ionicons } from '@expo/vector-icons'
import type React from "react"
import { Modal, Text, TouchableOpacity, View } from "react-native"
import Button from "../common/button"


const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ visible, onClose, onConfirm, isPending }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="w-[85%] bg-white rounded-3xl p-6 items-center shadow-md">
          <TouchableOpacity className="absolute right-4 top-4 z-10" onPress={onClose}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>

          {/* <View className="mt-5 mb-5 items-center">
            <View className="w-10 h-3 bg-red-500 rounded-t-lg" />
            <View className="w-[70px] h-20 bg-red-200 rounded-b-lg" />
          </View> */}

          {/* <Text className="text-2xl font-semibold text-red-500 mb-5 text-center">Delete Account Confirmation</Text> */}

          <Text className="text-base text-gray-600 text-center mb-4 leading-6">
            This action is permanent and cannot be undone. Your profile, data, and ongoing projects will be lost.
          </Text>

          <Text className="text-lg text-gray-600 text-center mb-8 font-medium">Are you sure you want to proceed?</Text>

          <Button className="bg-red-500 w-full py-4 rounded-xl items-center mt-2" onPress={onConfirm}
            loading={isPending}
            disabled={isPending}
            loadingText="Deleting account..."
          >
            <Text className="text-white text-lg font-semibold">Yes, delete account</Text>
          </Button>
        </View>
      </View>
    </Modal>
  )
}

export default DeleteAccountModal