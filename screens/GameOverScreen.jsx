import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import Card from "../components/Card";
import MainButton from "../components/MainButton";
import defaultStyles from "../constants/default-styles";
import colors from "../constants/colors";

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={defaultStyles.title}>The Game is Over!</Text>
      <Image
        style={styles.image}
        source={require("../assets/images/success.png")}
      />
      <Card style={styles.card}>
        <Text style={{ ...defaultStyles.bodyText, ...styles.text }}>
          Your phone needed{" "}
          <Text style={styles.highlight}>{props.roundsNumber}</Text> round to
          guess the number{" "}
          <Text style={styles.highlight}>{props.userNumber}</Text>
        </Text>
        <View style={styles.button}>
          <MainButton
            style={{ marginTop: 4 }}
            title="NEW GAME"
            onPress={props.onRestart}
          />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "black",
    marginVertical: 30,
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    width: 300,
  },
  text: {
    textAlign: "center",
    fontSize: 18,
  },
  highlight: {
    color: colors.primary,
    fontFamily: "open-sans-bold",
  },
  button: {
    marginTop: 10,
  },
});

export default GameOverScreen;
