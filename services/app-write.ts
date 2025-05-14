import { Client } from 'react-native-appwrite';


const DATABASE_ID = process.env.EXPO_PUBLIC_APP_WRITE_DATABASE_ID!;
const MESSAGE_COLLECTION_ID = process.env.EXPO_PUBLIC_APP_WRITE_MESSAGE_COLLECTION_ID!;


const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(process.env.EXPO_PUBLIC_APP_WRITE_PROJECT_ID!)



