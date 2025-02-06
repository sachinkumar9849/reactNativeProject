import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { styled } from 'nativewind';

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

const StyledTextInput = styled(TextInput);

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
}) => {
  return (
    <View className="w-full mb-4">
      {label && <Text className="text-gray-700 mb-1">{label}</Text>}
      <StyledTextInput
        className="border border-gray-300 rounded-md p-3 text-base"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default InputField;
