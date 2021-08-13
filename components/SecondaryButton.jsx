import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import colors from "../constants/colors";

const SecondaryButton = (props) => {
  let textColor;
  if (!props.textColor) textColor = "white";
  else textColor = props.textColor;

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
      <View style={{ ...styles.button, ...props.style }}>
        <Text
          style={{ ...styles.buttonText, ...props.textStyle, color: textColor }}
        >
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "open-sans",
    fontSize: 18,
  },
});

export default SecondaryButton;
