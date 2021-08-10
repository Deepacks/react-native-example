import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import Card from "../components/Card";
import defaultStyles from "../constants/default-styles";

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Card style={styles.card}>
        <Text style={defaultStyles.title}>The Game is Over!</Text>
        <Text style={defaultStyles.bodyText}>
          Number of rounds: {props.roundsNumber}
        </Text>
        <Text style={defaultStyles.bodyText}>
          The number was: {props.userNumber}
        </Text>
        <Button title="NEW GAME" onPress={props.onRestart} />
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
  card: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GameOverScreen;
