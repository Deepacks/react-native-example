import React, { useState, useRef, useEffect } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import defaultStyles from "../constants/default-styles";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min) + min);
  if (rndNum === exclude) return generateRandomBetween(min, max, exclude);
  else return rndNum;
};

const GameScreen = (props) => {
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const [round, setRounds] = useState(0);
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      props.userChoice
    )
  );

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.onGameOver(round);
    }
  }, [currentGuess]);

  const nextGuessHandler = (isBigger) => {
    if (
      (isBigger && currentGuess > props.userChoice) ||
      (!isBigger && currentGuess < props.userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    } else if (isBigger) {
      currentLow.current = currentGuess;
    } else if (!isBigger) {
      currentHigh.current = currentGuess;
    }
    const nextGuess = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextGuess);
    setRounds((curRounds) => curRounds + 1);
  };

  return (
    <View style={styles.screen}>
      <Text style={defaultStyles.bodyText}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonsContainer}>
        <Button title="LOWER" onPress={nextGuessHandler.bind(this, false)} />
        <Button title="HIGHER" onPress={nextGuessHandler.bind(this, true)} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});

export default GameScreen;
