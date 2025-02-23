import { StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const SettingLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="profile" options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name="candidate-profile" options={{headerShown:false}}></Stack.Screen>
      </Stack>
    </>
  );
};

export default SettingLayout;

const styles = StyleSheet.create({});
