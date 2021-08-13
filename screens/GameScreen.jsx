import React, { useState, useRef, useEffect } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import defaultStyles from "../constants/default-styles";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min) + min);
  if (rndNum === exclude) return generateRandomBetween(min, max, exclude);
  else return rndNum;
};

const renderListItem = (numOfRound, value) => (
  <View key={numOfRound} style={styles.listItem}>
    <Text style={defaultStyles.bodyText}>#{numOfRound}</Text>
    <Text style={defaultStyles.bodyText}>{value}</Text>
  </View>
);

const GameScreen = (props) => {
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const initialGuess = generateRandomBetween(
    currentLow.current,
    currentHigh.current,
    props.userChoice
  );
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.onGameOver(pastGuesses.length);
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
    setPastGuesses((curPastGuesses) => [nextGuess, ...curPastGuesses]);
  };

  return (
    <View style={styles.screen}>
      <Text style={{ ...defaultStyles.bodyText, marginBottom: 10 }}>
        Opponent's Guess
      </Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonsContainer}>
        <MainButton
          title={<Ionicons name="md-remove" size={24} />}
          onPress={nextGuessHandler.bind(this, false)}
        />
        <MainButton
          title={<Ionicons name="md-add" size={24} />}
          onPress={nextGuessHandler.bind(this, true)}
        />
      </Card>
      <View style={styles.listContainer}>
        <ScrollView
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        >
          {pastGuesses.map((guess, index) =>
            renderListItem(pastGuesses.length - index, guess)
          )}
        </ScrollView>
      </View>
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
    width: 400,
    maxWidth: "85%",
  },
  listContainer: {
    width: "80%",
    marginVertical: 15,
    flex: 1,
  },
  list: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
});

export default GameScreen;
