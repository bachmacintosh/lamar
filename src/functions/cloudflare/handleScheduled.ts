import type { APIEmbed, RESTPostAPIChannelMessageJSONBody } from "discord-api-types/v10";
import type { Env, SteamUserInfo } from "../../types";
import deletePreviousMessages from "../discord/deletePreviousMessages";
import getPlayerSummaries from "../steam/getPlayerSummaries";
import getPreviousMessages from "../discord/getPreviousMessages";
import randomLamarQuote from "../util/randomLamarQuote";
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
		} else if (
			typeof previousSteamUserInfo.gameextrainfo === "undefined" &&
			typeof currentSteamUserInfo.gameextrainfo === "undefined"
		) {
			title = "No Steam Game Running";
			description = "I'll let you know when I see one.";
			color = colors.grey;
		} else if (
			typeof previousSteamUserInfo.gameextrainfo !== "undefined" &&
			typeof currentSteamUserInfo.gameextrainfo === "undefined"
		) {
			title = "Previously Running Steam Game Has Quit";
			description = previousSteamUserInfo.gameextrainfo;
			color = colors.red;
		} else if (
			typeof previousSteamUserInfo.gameextrainfo !== "undefined" &&
			typeof currentSteamUserInfo.gameextrainfo !== "undefined"
		) {
			title = "Steam Game Still Running";
			description = currentSteamUserInfo.gameextrainfo;
			color = colors.green;
		}
	}
	const embed: APIEmbed = {
		title,
		description,
		color,
	};

	const payload: RESTPostAPIChannelMessageJSONBody = {
		embeds: [embed],
	};

	if (color === colors.red) {
		payload.content = `<@${env.DISCORD_MENTION_USER_ID}> ${randomLamarQuote()}`;
	}

	if ((runHour === midnight || runHour === noon) && runMinute < firstTenMinutes) {
		const previousMessages = await getPreviousMessages(env);
		if (previousMessages !== null) {
			await deletePreviousMessages(previousMessages, env);
		}
	}

	await env.KV.put("game_info", JSON.stringify(currentSteamUserInfo), { expirationTtl: 86400 });
	await sendMessage(env, payload);
}
