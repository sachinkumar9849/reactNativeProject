import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";


const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="bg-white">
      {/* <Text className="text-base text-gray-100 font-pmedium">{title}</Text> */}

      <View className="border border-[#6C7278] rounded-md h-[40px]">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#00000099"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? show : hide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
