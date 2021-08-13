import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import Card from "../components/Card";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import MainButton from "../components/MainButton";
import SecondaryButton from "../components/SecondaryButton";
import defaultStyles from "../constants/default-styles";
import colors from "../constants/colors";

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [selectedNumber, setSelectedNUmber] = useState("");

  const inputLooseFocus = () => {
    Keyboard.dismiss();
  };

  const inputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetHandler = () => {
    setEnteredValue("");
    setIsConfirmed(false);
  };

  const confirmHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid number!", "Number has to be between 1 and 99.", [
        { text: "Okay", style: "destructive", onPress: resetHandler },
      ]);
      return;
    }
    setIsConfirmed(true);
    setSelectedNUmber(chosenNumber);
    setEnteredValue("");
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (isConfirmed) {
    confirmedOutput = (
      <Card style={styles.confirmedCard}>
        <Text style={defaultStyles.bodyText}>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton
          title="START GAME"
          onPress={() => props.onStartGame(selectedNumber)}
          style={{ marginTop: 5 }}
        />
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={inputLooseFocus}>
      <View style={styles.screen}>
        <Text style={{ ...defaultStyles.title, ...styles.title }}>
          Start a New Game!
        </Text>
        <Card style={styles.inputContainer}>
          <Text style={defaultStyles.bodyText}>Select a Number</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={inputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <SecondaryButton
              title="Reset"
              onPress={resetHandler}
              style={styles.button}
              textColor={colors.secondary}
            />
            <MainButton
              title="Confirm"
              onPress={confirmHandler}
              style={styles.button}
              textColor={colors.primary}
            />
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    marginVertical: 10,
  },
  inputContainer: {
    width: "100%",
    maxWidth: "80%",
    alignItems: "center",
  },
  input: {
    width: 30,
    textAlign: "center",
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop: 4,
  },
  button: {
    width: 100,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  confirmedCard: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default StartGameScreen;
