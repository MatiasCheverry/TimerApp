import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

export default function runningTimer({ timerSettings }) {
	const [clock, setClock] = useState({ minutes: "00", seconds: "00" });
	const [intervalTimer, setIntervalTimer] = useState({
		warn: {
			seconds:
				parseInt(timerSettings.warnTime.minutes) * 60 +
				parseInt(timerSettings.warnTime.seconds),
			rounds: 1,
		},
		work: {
			seconds:
				parseInt(timerSettings.workTime.minutes) * 60 +
				parseInt(timerSettings.workTime.seconds),
			rounds: timerSettings.rounds,
		},
		rest: {
			seconds:
				parseInt(timerSettings.restTime.minutes) * 60 +
				parseInt(timerSettings.restTime.seconds),
			rounds: timerSettings.rounds,
		},
	});

	console.log(intervalTimer);
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
			console.log("holaaa");
			console.log(countDown);
			return setClock(countDown);
		}
		// we don't want to wait a full second before the timer starts
		timer();
		setInterval(timer, 1000);
	};
	const clockRunner = async function () {
		if (parseInt(intervalTimer.work.rounds) > 0) {
			for (const item in intervalTimer) {
				console.log(intervalTimer[item]);

				const newRounds = parseInt(intervalTimer[item].rounds - 1);
				await startTimer(intervalTimer[item].seconds);
				setIntervalTimer(
					...intervalTimer,
					(intervalTimer[item].rounds: newRounds)
				);
			}
		}
	};
	return (
		<View style={styles.container}>
			<Text>{clock.minutes + ":" + clock.seconds}</Text>
			<Button onPress={() => clockRunner()} title={"Run"}></Button>
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
