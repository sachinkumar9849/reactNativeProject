import { StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const CandidateLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="skills-select" options={{ headerShown: false }}></Stack.Screen>
        
      </Stack>

    </>
  );
};

export default CandidateLayout;

const styles = StyleSheet.create({});
