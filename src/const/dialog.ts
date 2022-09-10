import type { LamarDialog, LamarPhrases } from "../types";

const dialog: Record<LamarDialog, LamarPhrases> = {
	lamar: {
		alreadyQuiet: "We already quiet, fool!",
		alreadyRunning: "We're already running, fool!",
		alreadyStopped: "We're already stopped, fool!",
		alreadyVerbose: "We already verbose, fool!",
		nowCurrentDialog: "Aww yeah we gonna make BANK on this bot thing homie, you watch.",
		nowQuiet: "Okay, I'll only let you know important stuff, homie.",
		nowRunning: "We all up and running now fam.",
		nowStopped: "I'm stopped dead in my tracks cuz.",
		nowVerbose: "You gonna hear every detail from your boy Lamar.",
		notificationPhrases: [
			"Sup, can a loc come up in your crib?",
			"What's happnin'?",
			"You ready to get schooled?",
			"Ayy, what it do??",
			"What's up, homie?",
			"What's up, bro?",
			"How's it goin'?",
			"What's the fizzness?",
			"Excuse me, amigo?",
			"Well ain't this fun, homie?",
			"Man, where the noise at?",
		],
	},
	standard: {
		alreadyQuiet: "This bot is already quiet.",
		alreadyRunning: "This bot is already running.",
		alreadyStopped: "This bot is already stopped.",
		alreadyVerbose: "This bot is already verbose.",
		nowCurrentDialog: "The bot now speaks in a standard fashion.",
		nowQuiet: "This bot will now only notify on game status changes.",
		nowRunning: "Bot notifications have started.",
		nowStopped: "Bot notifications have been stopped.",
		nowVerbose: "Bot will send messages even when game status hasn't changed.",
		notificationPhrases: [
			"Your attention please.",
			"Heads up.",
			"Sorry for the interruption.",
			"May want to take a look.",
		],
	},
};

export default dialog;
