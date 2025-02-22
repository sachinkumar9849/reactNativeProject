import { images } from "@/constants";
import { Image, Text, View, Pressable } from "react-native";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <View className="w-full px-6 items-center">
        <Image
          source={images.startImg}
          resizeMode="contain"
          className="w-200 h-200 mb-8"
        />
        <Text className="text-[20px] font-sourceProSemibold text-center mb-4">
          Chat with Employers
        </Text>
        <Text className="text-[14px] leading-5 text-center mb-8 px-4">
          Receive messages from employers and connect instantly to discuss potential opportunities.
        </Text>
        <View className="w-full mt-11">
          <CustomButton
            title="Login"
            textStyles="px-12"
            handlePress={() => router.push("/sign-in")}
          />
          <View className="flex-row justify-center mt-4">
            <Text className="text-gray-600">New to Jobklik? </Text>
            <Pressable onPress={() => router.push("/sign-up")}>
              <Text className="text-primary">Sign up</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}