import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

export default function App() {
  const [timer, setTimer] = useState({
    rounds: "3",
    workTime: "00:00",
    restTime: "00:00",
    warnTime: "00:05",
  });
  const [running, setRunning] = useState(false);
  const [timeleft, setTimeleft] = useState(Date.now());
  const startHandler = function () {
    if (!running) {
      setRunning(true);
      startTimer(60);
    }
  };
  const startTimer = function (duration) {
    var start = Date.now(),
      diff,
      minutes,
      seconds;

    function timer() {
      // get the number of seconds that have elapsed since
      // startTimer() was called
      diff = duration - (((Date.now() - start) / 1000) | 0);

      // does the same job as parseInt truncates the float
      minutes = (diff / 60) | 0;
      seconds = diff % 60 | 0;

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      var countDown = minutes + ":" + seconds;

      if (diff <= 0) {
        // add one second so that the count down starts at the full duration
        // example 05:00 not 04:59
        start = Date.now() + 1000;
      }

      return setTimeleft(countDown);
    }
    // we don't want to wait a full second before the timer starts
    timer();
    setInterval(timer, 1000);
  };

  return (
    <View style={styles.container}>
      <Text>This is my Timer-App!</Text>
      <View style={styles.workContainer}>
        <Text>{"Work"}</Text>

        <View style={styles.inputContainer}>
          <Button title="-" onPress={startHandler} />
          <Text style={styles.timeDisplay}>{timeleft}</Text>
          <Button title="+" onPress={startHandler} style={styles.buttonstyle} />
        </View>
      </View>
      <View style={styles.buttonstyle}>
        <Button title="Start" onPress={startHandler} />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
  timeDisplay: {
    fontSize: 50,
  },
  buttonstyle: {
    margin: 30,
    fontSize: 50,
  },
  workContainer: {
    margin: 30,
    justifyContent: "center",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
  },
});
