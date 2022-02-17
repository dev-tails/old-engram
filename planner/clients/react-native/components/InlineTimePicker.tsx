import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import React, { useState } from 'react';
import { Platform } from 'react-native';
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
      {Platform.OS !== "ios" ? (
        <Button
          type="clear"
          title={moment(date).format("LT")}
          buttonStyle={{ paddingHorizontal: 0 }}
          titleStyle={{ color: getTextColor(theme) }}
          onPress={() => {
            setShowTimePicker(true);
          }}
        />
      ) : null}
      {Platform.OS === "ios" || showTimePicker ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={(e: any, date?: Date) => {
            if (Platform.OS === "ios") {
              onChange(date);
            } else {
              setShowTimePicker(false);
              onChange(date);
            }
          }}
          style={{ width: 85 }}
        />
      ) : null}
    </>
  );
}
