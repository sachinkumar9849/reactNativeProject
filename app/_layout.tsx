import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import Toast from 'react-native-toast-message';
import { ApolloWrapper } from "./apollo/client";
import { useAuth } from "./hooks/useAuth";

export default function RootLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const [fontsLoaded, error] = useFonts({
    "source-sans-pro-semibold": require("../assets/fonts/source-sans-pro-semibold.ttf"),


  });
  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      // SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <ApolloWrapper>
      <Stack >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(candidateProfile)" options={{ headerShown: false }} />
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Toast />
      </Stack>
    </ApolloWrapper>
  )
}
