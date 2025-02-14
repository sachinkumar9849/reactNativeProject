import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Select from './Select';

interface DatePickerProps {
  label: string;
  month: string;
  year: string;
  onMonthChange: (value: string) => void;
  onYearChange: (value: string) => void;
  error?: string;
}



const DateSelector = ({ label, month, year, onMonthChange, onYearChange, error }: DatePickerProps) => {

  const months = [
    { label: 'January', value: '01' },
    { label: 'February', value: '02' },
    { label: 'March', value: '03' },
    { label: 'April', value: '04' },
    { label: 'May', value: '05' },
    { label: 'June', value: '06' },
    { label: 'July', value: '07' },
    { label: 'August', value: '08' },
    { label: 'September', value: '09' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' }
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => ({
    label: String(currentYear - i),
    value: String(currentYear - i)
  }));


  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        <View style={styles.monthPicker}>
          <Select
            placeholder="Month"
            items={months}
            value={month}
            onValueChange={onMonthChange}
          />
        </View>
        <View style={styles.yearPicker}>
          <Select
            placeholder="Year"
            items={years}
            value={year}
            onValueChange={onYearChange}
          />
        </View>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    marginBottom: 8,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  monthPicker: {
    flex: 1,
  },
  yearPicker: {
    flex: 1,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  }
})

export default DateSelector