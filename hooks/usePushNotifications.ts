import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';

/**
 * Interface defining the state structure for push notifications
 * - notification: Current notification object when app receives a notification
 * - expoPushToken: Unique token for this device to receive push notifications
 */
export interface PushNotificationState {
  notification?: Notifications.Notification;
  expoPushToken?: Notifications.ExpoPushToken;
}

/**
 * Custom hook for handling push notifications in the app
 * 
 * This hook:
 * 1. Requests notification permissions from the user
 * 2. Registers the device for push notifications and gets a unique token
 * 3. Sets up listeners for incoming notifications and user responses
 * 4. Handles notification display behavior (sound, badge, alert)
 * 5. Provides cleanup on unmount to prevent memory leaks
 * 
 * @returns PushNotificationState object containing current notification and push token
 */
export const usePushNotifications = (): PushNotificationState => {
  // State to store the current notification and push token
  const [notification, setNotification] = useState<Notifications.Notification | undefined>();
  const [expoPushToken, setExpoPushToken] = useState<Notifications.ExpoPushToken | undefined>();

  // Configure how notifications are handled when app is in foreground
  // This prevents the default system notification and allows custom handling
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: false,    // Don't play sound for foreground notifications
      shouldSetBadge: false,     // Don't update app badge count
      shouldShowAlert: true,     // Show alert/banner for foreground notifications
    }),
  });

  // Refs to store notification listeners for cleanup
  const notificationListener = useRef<Notifications.EventSubscription | null>(null);
  const responseListener = useRef<Notifications.EventSubscription | null>(null);

  /**
   * Registers the device for push notifications
   * 
   * This function:
   * 1. Checks if running on a physical device (required for push notifications)
   * 2. Requests notification permissions if not already granted
   * 3. Gets the Expo push token for this device
   * 4. Sets up Android notification channel (required for Android)
   * 
   * @returns Promise<Notifications.ExpoPushToken | undefined> - The push token or undefined if failed
   */
  async function registerForPushNotificationsAsync() {
    let token;

    // Push notifications only work on physical devices, not simulators
    if (Device.isDevice) {
      // Check current permission status
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      // Request permissions if not already granted
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      // If permission denied, show alert and return
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }

      // Get the Expo push token for this device
      // This token is unique to this device and app
      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId,
      });

      // Set up Android notification channel (required for Android 8.0+)
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250], // Vibration pattern: wait 0ms, vibrate 250ms, wait 250ms, vibrate 250ms
        });
      }

      return token;
    } else {
      console.log("Must use physical device for Push Notifications");
    }
  }

  // Set up notification listeners when component mounts
  useEffect(() => {
    // Register for push notifications and store the token
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // Listener for when a notification is received (app in foreground or background)
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // Listener for when user taps on a notification (app in background or closed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      setNotification(response.notification);
    });

    // Cleanup function to remove listeners when component unmounts
    // This prevents memory leaks and ensures proper cleanup
    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  // Return the current notification state and push token
  return {
    notification,
    expoPushToken,
  };
}