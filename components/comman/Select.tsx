import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

const Select = ({ 
  placeholder, 
  items, 
  value, 
  onValueChange, 
  disabled = false 
}) => {
  return (
    <Dropdown
      style={[
        styles.dropdown,
        disabled && styles.disabledDropdown
      ]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={items || []}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={placeholder || "Select item"}
      value={value}
      onChange={item => {
        onValueChange(item.value);
      }}
      disable={disabled}
      renderItem={item => (
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.label}</Text>
          {item.value === value && (
            <AntDesign
              style={styles.icon}
              color="black"
              name="check"
              size={20}
            />
          )}
        </View>
      )}
    />
  );
};

export default Select;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 8,
  },
  disabledDropdown: {
    opacity: 0.5,
    backgroundColor: '#F3F4F6',
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 14,
    color: '#94A3B8',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#1F2937',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
  },
});