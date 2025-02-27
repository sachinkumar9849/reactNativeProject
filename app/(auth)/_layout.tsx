import { StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="sign-up" options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name="sign-in" options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name="email-verify" options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name="phone-verify" options={{ headerShown: false }}></Stack.Screen>
      </Stack>

    </>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
