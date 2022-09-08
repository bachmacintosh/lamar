import type { APIEmbed, Env, RESTPostAPIChannelMessageJSONBody } from "../../types";
import { APIVersion } from "../../const/discord/ourAPIVersion";
import randomLamarQuote from "../util/randomLamarQuote";

export default async function sendMessage(env: Env, title: string, description: string, color: number): Promise<void> {
	const embed: APIEmbed = {
		title,
		description,
		color,
	};

	const payload: RESTPostAPIChannelMessageJSONBody = {
		embeds: [embed],
	};

	const colors = {
		red: 0xed4245,
		yellow: 0xfee75c,
		green: 0x57f287,
		grey: 0x95a5a6,
	};

	if (color === colors.red) {
		payload.content = `<@${env.DISCORD_MENTION_USER_ID}> ${randomLamarQuote()}`;
	}

	const url = `https://discord.com/api/v${APIVersion}/channels/${env.DISCORD_CHANNEL_ID}/messages`;
	const headers = new Headers({
		Authorization: `Bot ${env.DISCORD_BOT_TOKEN}`,
		"Content-Type": "application/json",
	});

	const init: RequestInit = {
		method: "POST",
		headers,
		body: JSON.stringify(payload),
	};

	await fetch(url, init);
}
