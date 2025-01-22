import { TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { COLORS, SPACING } from '../theme';

interface CustomButtonProps {
  title: string;
  textStyles?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  handlePress?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  textStyles,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  handlePress
}) => {
  const getButtonStyles = () => {
    const baseStyles = 'rounded-md flex items-center justify-center';
    const variantStyles = {
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      outline: 'border-2 border-primary bg-transparent'
    };
    const sizeStyles = {
      small: 'px-4 py-2',
      medium: 'px-6 py-3',
      large: 'px-8 py-4'
    };
    const disabledStyles = disabled ? 'opacity-50' : '';

    return `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles}`;
  };

  const getTextStyles = () => {
    const baseStyles = 'font-psemibold text-center';
    const variantTextStyles = {
      primary: 'text-white',
      secondary: 'text-white',
      outline: 'text-primary'
    };
    const sizeTextStyles = {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg'
    };

    return `${baseStyles} ${variantTextStyles[variant]} ${sizeTextStyles[size]} ${textStyles || ''}`;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={getButtonStyles()}
      onPress={handlePress}
      disabled={disabled}
    >
      <Text className={getTextStyles()}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
