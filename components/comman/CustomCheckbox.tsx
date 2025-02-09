import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Animated } from 'react-native';

const CustomCheckbox = ({ 
  label = '',
  initialValue = false,
  onValueChange = () => {},
  disabled = false,
  size = 18,
  borderColor = '#666',
  checkColor = '#2196F3',
  labelStyle = {},
  containerStyle = {}
}) => {
  const [isChecked, setIsChecked] = useState(initialValue);
  const [scaleValue] = useState(new Animated.Value(1));

  const handlePress = () => {
    if (disabled) return;

    // Animation when pressed
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setIsChecked(!isChecked);
    onValueChange(!isChecked);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={handlePress}
      disabled={disabled}
      style={[styles.container, containerStyle]}
    >
      <Animated.View
        style={[
          styles.checkbox,
          {
            width: size,
            height: size,
            borderColor: disabled ? '#ccc' : borderColor,
            transform: [{ scale: scaleValue }],
          },
          isChecked && { backgroundColor: disabled ? '#ccc' : checkColor },
        ]}
      >
        {isChecked && (
          <View style={styles.checkmark}>
            <View style={[styles.checkmarkLine, styles.checkmarkLeftLine]} />
            <View style={[styles.checkmarkLine, styles.checkmarkRightLine]} />
          </View>
        )}
      </Animated.View>
      {label ? <Text style={[styles.label, labelStyle, disabled && styles.disabledLabel]}>{label}</Text> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkbox: {
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkLine: {
    position: 'absolute',
    backgroundColor: 'white',
    height: 2,
  },
  checkmarkLeftLine: {
    width: '35%',
    transform: [{ rotate: '45deg' }],
    left: '20%',
    top: '45%',
  },
  checkmarkRightLine: {
    width: '60%',
    transform: [{ rotate: '-45deg' }],
    right: '15%',
    top: '35%',
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
  },
  disabledLabel: {
    color: '#ccc',
  },
});

export default CustomCheckbox;