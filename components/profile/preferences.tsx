
import { useState } from "react"
import { View, Text, TouchableOpacity, Switch, ScrollView, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import DeleteAccountModal from "./delete-profile"


export default function PreferencesScreen() {
  // State for toggle switches
  const [disableProfile, setDisableProfile] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(false)
  const [newsletterSubscriptions, setNewsletterSubscriptions] = useState(false)
  const [onlineStatus, setOnlineStatus] = useState(true)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)

  // Function to handle toggle changes with confirmation if needed
  const handleToggle = (
    setting: "disableProfile" | "emailNotifications" | "newsletterSubscriptions" | "onlineStatus",
    value: boolean,
    setSetting: (value: boolean) => void,
  ) => {
    // For important settings, show confirmation dialog
    if (setting === "disableProfile" && !value) {
      Alert.alert("Enable Profile", "Are you sure you want to reactivate your service seeker profile?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Enable",
          onPress: () => {
            setSetting(value)
            // Here you would typically update this preference on your backend
          },
        },
      ])
    } else {
      setSetting(value)
      // Here you would typically update this preference on your backend
    }
  }

  // Function to handle delete account confirmation
  const handleDeleteConfirm = () => {
    console.log("Account deletion confirmed")
    setDeleteModalVisible(false)
    // Here you would handle the actual account deletion process
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="py-6">
        {/* Disable service seeker profile */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-lg font-semibold text-black">Disable service seeker profile</Text>
            <View className="scale-[0.8]">
              <Switch
                value={disableProfile}
                onValueChange={(value) => handleToggle("disableProfile", value, setDisableProfile)}
                trackColor={{ false: "#e5e7eb", true: "#4338ca" }}
                thumbColor="#ffffff"
                ios_backgroundColor="#e5e7eb"
              />
            </View>
          </View>
          <Text className="text-base text-gray-500">
            Temporarily pause your account. You won't be able to search for service providers until you reactivate.
          </Text>
        </View>

        <View className="h-px bg-gray-200 my-2" />

        {/* Email notifications */}
        <View className="mb-6 mt-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-lg font-semibold text-black">Email notifications</Text>
            <View className="scale-[0.8]">
              <Switch
                value={emailNotifications}
                onValueChange={(value) => handleToggle("emailNotifications", value, setEmailNotifications)}
                trackColor={{ false: "#e5e7eb", true: "#4338ca" }}
                thumbColor="#ffffff"
                ios_backgroundColor="#e5e7eb"
              />
            </View>
          </View>
          <Text className="text-base text-gray-500">Stay updated on job invites, messages, and platform updates.</Text>
        </View>

        <View className="h-px bg-gray-200 my-2" />

        {/* Newsletter subscriptions */}
        <View className="mb-6 mt-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-lg font-semibold text-black">Newsletter subscriptions</Text>
            <View className="scale-[0.8]">
              <Switch
                value={newsletterSubscriptions}
                onValueChange={(value) => handleToggle("newsletterSubscriptions", value, setNewsletterSubscriptions)}
                trackColor={{ false: "#e5e7eb", true: "#4338ca" }}
                thumbColor="#ffffff"
                ios_backgroundColor="#e5e7eb"
              />
            </View>
          </View>
          <Text className="text-base text-gray-500">
            Get the latest freelancing tips, platform updates, and exclusive opportunities straight to your inbox.
          </Text>
        </View>

        <View className="h-px bg-gray-200 my-2" />

        {/* Online status */}
        <View className="mb-6 mt-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-lg font-semibold text-black">Online status</Text>
            <View className="scale-[0.8]">
              <Switch
                value={onlineStatus}
                onValueChange={(value) => handleToggle("onlineStatus", value, setOnlineStatus)}
                trackColor={{ false: "#e5e7eb", true: "#4338ca" }}
                thumbColor="#ffffff"
                ios_backgroundColor="#e5e7eb"
              />
            </View>
          </View>
          <Text className="text-base text-gray-500">
            Control your visibility. Appear online when active or switch to offline mode to work without distractions.
          </Text>
        </View>

        <View className="h-px bg-gray-200 my-2" />

        {/* Delete account */}
        <TouchableOpacity
          className="flex-row justify-between items-center py-4 mt-4"
          onPress={() => setDeleteModalVisible(true)}
        >
          <View>
            <Text className="text-lg font-semibold text-red-500">Delete account</Text>
            <Text className="text-base text-[#EE313780]/50 mt-1 pr-4">
              Permanently remove your account and all associated data. This action cannot be undone.
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#f43f5e" />
        </TouchableOpacity>
      </View>

      {/* Delete Account Modal */}
      <DeleteAccountModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={handleDeleteConfirm}
      />
    </ScrollView>
  )
}

