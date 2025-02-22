import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: '#fff',
            width: 280,
          },
          drawerType: 'front',
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: "Home",
            headerTitle: "Home",
          }}
        />
        <Drawer.Screen
          name="Profile"
          
          options={{
            drawerLabel: "Profile",
            headerTitle: "Profile",
          
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}