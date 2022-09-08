import type { Env, SteamUserInfo } from "../../types";
import deletePreviousMessages from "../discord/deletePreviousMessages";
import getConfig from "./getConfig";
import getPlayerSummaries from "../steam/getPlayerSummaries";
import getPreviousMessages from "../discord/getPreviousMessages";
import sendMessage from "../discord/sendMessage";

export default async function handleScheduled(env: Env): Promise<void> {
	const colors = {
		red: 0xed4245,
		yellow: 0xfee75c,
		green: 0x57f287,
		grey: 0x95a5a6,
	};

	let title = "";
	let description = "";
	let color = colors.green;

	const dateOptions = { timeZone: "America/New_York" };
	const date = new Date().toLocaleString("en-US", dateOptions);
	const runDate = new Date(date);
	const runHour = runDate.getHours();
	const runMinute = runDate.getMinutes();
	const midnight = 0;
	const noon = 12;
	const firstTenMinutes = 10;

	if ((runHour === midnight || runHour === noon) && runMinute < firstTenMinutes) {
		const previousMessages = await getPreviousMessages(env);
		if (previousMessages !== null) {
			await deletePreviousMessages(previousMessages, env);
		}
	}

	const config = await getConfig(env);

	if (config.status === "running") {
		const kvString = await env.KV.get("game_info", "text");
		const steamInfo = await getPlayerSummaries(env);
		const currentSteamUserInfo = steamInfo.response.players[0];

		if (kvString === null) {
			title = "No previous Steam info was found.";
			if (typeof currentSteamUserInfo.gameextrainfo === "undefined") {
				description = "No Steam Game Running";
			} else {
				description = currentSteamUserInfo.gameextrainfo;
			}
			color = colors.yellow;
			await sendMessage(env, title, description, color);
		} else {
			const oldSteamInfo = JSON.parse(kvString) as SteamUserInfo;
			const previousSteamUserInfo = oldSteamInfo.response.players[0];
			if (
				typeof previousSteamUserInfo.gameextrainfo === "undefined" &&
				typeof currentSteamUserInfo.gameextrainfo !== "undefined"
			) {
				title = "Now Keeping Track of Steam Game";
				description = currentSteamUserInfo.gameextrainfo;
				color = colors.green;
				await sendMessage(env, title, description, color);
			} else if (
				typeof previousSteamUserInfo.gameextrainfo === "undefined" &&
				typeof currentSteamUserInfo.gameextrainfo === "undefined" &&
				config.verbose
			) {
				title = "No Steam Game Running";
				description = "I'll let you know when I see one.";
				color = colors.grey;
				await sendMessage(env, title, description, color);
			} else if (
				typeof previousSteamUserInfo.gameextrainfo !== "undefined" &&
				typeof currentSteamUserInfo.gameextrainfo === "undefined"
			) {
				title = "Previously Running Steam Game Has Quit";
				description = previousSteamUserInfo.gameextrainfo;
				color = colors.red;
				await sendMessage(env, title, description, color);
			} else if (
				typeof previousSteamUserInfo.gameextrainfo !== "undefined" &&
				typeof currentSteamUserInfo.gameextrainfo !== "undefined" &&
				config.verbose
			) {
				title = "Steam Game Still Running";
				description = currentSteamUserInfo.gameextrainfo;
				color = colors.green;
				await sendMessage(env, title, description, color);
			}
		}

		await env.KV.put("game_info", JSON.stringify(steamInfo), { expirationTtl: 86400 });
	}
}
