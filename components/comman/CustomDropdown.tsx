import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { gql, useQuery } from '@apollo/client';
import { GET_CANDIDATE_LOCATIONS } from '@/app/apollo/queries';



const DropdownComponent = ({ value, onChange }) => {
  const { loading, error, data } = useQuery(GET_CANDIDATE_LOCATIONS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading data</Text>;

  // Map API response to dropdown format
  const dropdownData = data.candidateLocations.map((location) => ({
    label: location.nicename,
    value: location.id,
  }));

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        data={dropdownData}
        labelField="label"
        valueField="value"
        placeholder="Select a country"
        value={value}
        onChange={(item) => onChange(item.value)}  // Call onChange with selected value
      />
    </View>
  );
};


export default DropdownComponent;

const styles = StyleSheet.create({

  dropdown: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#bec5cf',
  },
});
