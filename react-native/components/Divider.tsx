import React from "react";
import { StyleSheet } from "react-native";

import { View, Text } from "./Themed";
import useColorScheme from "../hooks/useColorScheme";

export type DateHeaderProps = {
  title?: string;
};

export default function Divider() {
  const theme = useColorScheme();

  const styles = StyleSheet.create({
    divider: {
      width: "100%",
      borderBottomWidth: 2,
      borderBottomColor: theme === "light" ? "#EEE" : "#424242",
      marginVertical: 8
    },
  });

  return (
    <View style={styles.divider}></View>
  );
}
