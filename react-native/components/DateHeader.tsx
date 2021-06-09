import React from "react";
import { StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { View, Text } from "./Themed";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";

export type DateHeaderProps = {
  date: Date;
  onChange: (date: Date) => void;
  onRefresh: () => void;
  onToday: () => void;
};

export default function DateHeader({ date, onChange, onRefresh, onToday }: DateHeaderProps) {
  const theme = useColorScheme();

  const styles = StyleSheet.create({
    dateHeader: {
      paddingVertical: 4,
      borderBottomWidth: 1,
      borderBottomColor: theme ==="light" ? "#EEE" : "#424242"
    },
    content: {
      width: "100%",
      maxWidth: 800,
      flexDirection: "row"
    },
    spacer: {
      flexGrow: 1
    },
    date: {
      fontSize: 24,
      paddingHorizontal: 8,
      paddingVertical: 4
    },
    outerButton: {
      marginHorizontal: 8
    }
  });

  function handleDateLeftPressed() {
    handleDateChanged(-1);
  }

  function handleDateRightPressed() {
    handleDateChanged(1);
  }

  function handleDateChanged(amount: number) {
    onChange(moment(date).add(amount, 'days').toDate());
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
        <Button onPress={handleTodayPressed} type="clear" style={styles.outerButton} icon={<Icon name="calendar" size={24} color={iconColor}/>}/>
        <View style={styles.spacer}></View>
        <Button onPress={handleDateLeftPressed} type="clear" icon={<Icon name="chevron-left" size={24} color={iconColor}/>} />
        <Text style={styles.date}>{moment(date).format("YYYY-MM-DD")}</Text>
        <Button onPress={handleDateRightPressed} type="clear" icon={<Icon name="chevron-right" size={24} color={iconColor} />} />
        <View style={styles.spacer}></View>
        <Button onPress={handleRefreshPressed} type="clear" style={styles.outerButton} icon={<Icon name="refresh" size={24} color={iconColor}/>}/>
      </View>
    </View>
  );
}
