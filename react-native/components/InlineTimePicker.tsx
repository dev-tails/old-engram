import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';

type InlineTimePickerProps = {
  date: Date;
  onChange: (date?: Date) => void;
};

export default function InlineTimePicker({
  date,
  onChange,
}: InlineTimePickerProps) {
  return (
    <DateTimePicker
      testID="dateTimePicker"
      value={date}
      mode="time"
      is24Hour={true}
      display="default"
      onChange={(e: any, date?: Date) => {
        onChange(date);
      }}
      textColor="red"
      style={{ width: 80 }}
    />
  );
}
