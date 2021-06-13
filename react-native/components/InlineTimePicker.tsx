import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import React, { useState } from 'react';
import { Button } from 'react-native-elements';

import { getTextColor } from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

type InlineTimePickerProps = {
  date: Date;
  onChange: (date?: Date) => void;
};

export default function InlineTimePicker({
  date,
  onChange,
}: InlineTimePickerProps) {
  const theme = useColorScheme();
  const [showTimePicker, setShowTimePicker] = useState(false);

  return (
    <>
      <Button
        type="clear"
        title={moment(date).format("LT")}
        buttonStyle={{ paddingHorizontal: 0 }}
        titleStyle={{ color: getTextColor(theme) }}
      />
      {showTimePicker ? (
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
      ) : null}
    </>
  );
}
