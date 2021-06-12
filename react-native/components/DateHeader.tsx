import moment from 'moment';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { Text, View } from './Themed';

export type DateHeaderProps = {
  date: Date;
  onChange: (date: Date) => void;
  onRefresh: () => void;
  onToday: () => void;
};

export default function DateHeader({
  date,
  onChange,
  onRefresh,
  onToday,
}: DateHeaderProps) {
  const theme = useColorScheme();
  const backgroundColor = theme === "light" ? "#EEE" : "#424242";

  const styles = StyleSheet.create({
    dateHeader: {
      paddingVertical: 4,
      backgroundColor,
    },
    content: {
      width: "100%",
      maxWidth: 800,
      flexDirection: "row",
      backgroundColor,
    },
    spacer: {
      flexGrow: 1,
      backgroundColor,
    },
    date: {
      fontSize: 24,
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    outerButton: {
      marginHorizontal: 4,
    },
  });

  function handleDateLeftPressed() {
    handleDateChanged(-1);
  }

  function handleDateRightPressed() {
    handleDateChanged(1);
  }

  function handleDateChanged(amount: number) {
    onChange(moment(date).add(amount, "days").toDate());
  }

  function handleRefreshPressed() {
    onRefresh();
  }

  function handleTodayPressed() {
    onToday();
  }

  const iconColor = theme === "light" ? Colors.light.text : Colors.dark.text;

  return (
    <View style={styles.dateHeader}>
      <View style={styles.content}>
        <Button
          onPress={handleTodayPressed}
          type="clear"
          style={styles.outerButton}
          icon={<Icon name="today" size={24} color={iconColor} />}
        />
        <View style={styles.spacer}></View>
        <Button
          onPress={handleDateLeftPressed}
          type="clear"
          icon={<Icon name="chevron-left" size={24} color={iconColor} />}
        />
        <Text style={styles.date}>{moment(date).format("YYYY-MM-DD")}</Text>
        <Button
          onPress={handleDateRightPressed}
          type="clear"
          icon={<Icon name="chevron-right" size={24} color={iconColor} />}
        />
        <View style={styles.spacer}></View>
        <Button
          onPress={handleRefreshPressed}
          type="clear"
          style={styles.outerButton}
          icon={<Icon name="refresh" size={24} color={iconColor} />}
        />
      </View>
    </View>
  );
}
