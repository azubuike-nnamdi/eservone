# Push Notifications Setup - Frontend Integration

## ✅ What's Been Implemented

### 1. **Type Definitions** (`constants/types.ts`)

-  Added `RegisterPushTokenPayload` type for API communication
-  Follows existing API payload patterns in the app

### 2. **API Integration** (`hooks/mutation/useRegisterPushToken.ts`)

-  Created mutation hook for sending push tokens to backend
-  Handles platform detection (iOS/Android)
-  Includes app version and device information
-  Silent error handling (won't disrupt user experience)

### 3. **Push Notification Manager** (`hooks/usePushNotificationManager.ts`)

-  Combines existing `usePushNotifications` with token registration
-  Automatically registers tokens when user is authenticated
-  Provides registration status for debugging

### 4. **App Integration**

-  **Main Layout** (`app/_layout.tsx`): Initializes push notifications early
-  **Authenticated Layout** (`app/(root)/_layout.tsx`): Registers tokens for logged-in users
-  Added debug logging for development

### 5. **Debug Component** (`components/debug/PushNotificationDebug.tsx`)

-  Optional component for testing push notification status
-  Shows token generation, user auth, and registration status

## 🔧 How It Works

1. **App Launch**: Push notifications are initialized when the app starts
2. **Token Generation**: Expo generates a unique push token for the device
3. **User Authentication**: When user logs in, the token is automatically sent to backend
4. **Backend Registration**: Token is stored in your database linked to the user
5. **Notification Handling**: App listens for incoming notifications

## 📱 Expected Backend API

The frontend expects this API endpoint:

```
POST /eserve-one/register-push-token
```

**Headers:**

```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Payload:**

```json
{
  "pushToken": "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]",
  "deviceId": "unique-device-identifier",
  "platform": "ios" | "android",
  "appVersion": "1.0.7",
  "isActive": true
}
```

## 🧪 Testing

1. **Physical Device Required**: Push notifications only work on physical devices, not simulators
2. **Debug Logs**: Check console for push token generation and registration status
3. **Debug Component**: Add `<PushNotificationDebug />` to any screen for real-time status

## 🚀 Next Steps

1. **Backend Implementation**: Engineer needs to create the API endpoint
2. **Test Registration**: Verify tokens are being sent and stored
3. **Send Test Notifications**: Use Expo's push notification tool to test
4. **Production Testing**: Test on real devices with production builds

## 📝 Notes

-  Push notifications are automatically handled - no manual intervention needed
-  Tokens are re-registered when users log in
-  Silent failure prevents disrupting user experience
-  All existing push notification functionality remains unchanged
