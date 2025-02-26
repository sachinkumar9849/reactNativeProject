import { StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const CandidateLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="skills-select" options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name="add-role" options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name="add-experience" options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name="add-experience-form" options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name="show-experience" options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name="add-education" options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name="add-education-form" options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name="show-education" options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name="certifications-add" options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name="add-certifications-form" options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name="show-certifications" options={{ headerShown: false }}></Stack.Screen>
      </Stack>

    </>
  );
};

export default CandidateLayout;

const styles = StyleSheet.create({});
