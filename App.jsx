import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import RunningTimer from "./Components/RunningTimer.jsx";
export default function App() {
  const [timer, setTimer] = useState({
    rounds: 2,
    workTime: { minutes: "00", seconds: "00" },
    restTime: { minutes: "00", seconds: "00" },
    warnTime: { minutes: "00", seconds: "05" },
  });
  const [running, setRunning] = useState(false);
  const [currentTimer, setCurrentTimer] = useState({});
  const [timeleft, setTimeleft] = useState("00:00");
  const startHandler = function () {
    if (!running) {
      setRunning(true);
    }
  };
  const timeModHandler = function (propToMod, value) {
    var currentMinutes = parseInt(timer[propToMod].minutes);
    var currentSeconds = parseInt(timer[propToMod].seconds);
    var newTimer = { ...timer };
    if (value === -1 && currentMinutes <= 0 && currentSeconds <= 1) {
      newTimer[propToMod] = { minutes: "00", seconds: "00" };
      return setTimer(newTimer);
    }
    //first we setup the time and see if it's ok afterwards (meaning we check it's not
    //something like "01:60")
    currentSeconds = parseInt(currentSeconds) + parseInt(value);
    //now we check if we have something weird in the seconds, like in the previous example
    //we can't show 60 seconds, instead we have to say 1:00 (one minute)
    if (currentSeconds >= 60) {
      currentSeconds = "00";
      currentMinutes = parseInt(currentMinutes) + parseInt(value);
    }
    //the same if seconds === -1, we cannot show "00:-1" because it does not exist!
    if (currentSeconds <= -1) {
      //We first set the seconds to 59 and then rest the value to the minutes
      currentSeconds = 59;
      currentMinutes = parseInt(currentMinutes) + value;
    }

    var seconds = currentSeconds.toString();
    var minutes = currentMinutes.toString();
    if (minutes.length === 1) {
      minutes = "0" + minutes;
    }
    if (seconds.length === 1) {
      seconds = "0" + seconds;
    }
    newTimer[propToMod] = { minutes, seconds };
    return setTimer(newTimer);
  };
  const roundModHandler = function (value) {
    if (timer.rounds >= 0) {
      var newTimer = { ...timer };
      const newRounds = parseInt(newTimer.rounds) + value;
      if (newRounds >= 0) {
        newTimer.rounds = newRounds;
      }

      return setTimer(newTimer);
    }
  };
  const timerOn = function () {
    setRunning(true);
  };

  if (running === false) {
    return (
      <View style={styles.container}>
        {running ? <Text style={styles.timeDisplay}>{timeleft}</Text> : <></>}

        <View style={styles.workContainer}>
          <Text style={styles.textTitle}>{"Rounds"}</Text>
          <View style={styles.inputContainer}>
            <Button title="-" onPress={() => roundModHandler(-1)} />
            <Text style={styles.timeDisplay}>{timer.rounds}</Text>
            <Button title="+" onPress={() => roundModHandler(1)} />
          </View>
          <Text style={styles.textTitle}>{"Work"}</Text>
          <View style={styles.inputContainer}>
            <Button title="-" onPress={() => timeModHandler("workTime", -1)} />
            <Text style={styles.timeDisplay}>
              {timer.workTime.minutes + ":" + timer.workTime.seconds}
            </Text>
            <Button title="+" onPress={() => timeModHandler("workTime", 1)} />
          </View>
          <Text style={styles.textTitle}>{"Rest"}</Text>
          <View style={styles.inputContainer}>
            <Button title="-" onPress={() => timeModHandler("restTime", -1)} />
            <Text style={styles.timeDisplay}>
              {timer.restTime.minutes + ":" + timer.restTime.seconds}
            </Text>
            <Button title="+" onPress={() => timeModHandler("restTime", 1)} />
          </View>
        </View>
        <View style={styles.buttonstyle}>
          <Button title="Start" onPress={timerOn} />
        </View>

        <StatusBar style="auto" />
      </View>
    );
  } else {
    return <RunningTimer timerSettings={timer} />;
  }
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
  textTitle: {
    fontSize: 30,
    display: "flex",
    flexDirection: "row",
    margin: 20,
  },
  buttonstyle: {
    margin: 30,
    fontSize: 50,
  },
  workContainer: {
    margin: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
  },
});
