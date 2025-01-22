import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import Toast from 'react-native-toast-message';

export default function RootLayout() {
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
    
    <Stack>
      <Stack.Screen name="index" options={{headerShown:false}}/>
      <Stack.Screen name="(auth)" options={{headerShown:false}}/>
      <Toast />
    </Stack>
     
  )
}
