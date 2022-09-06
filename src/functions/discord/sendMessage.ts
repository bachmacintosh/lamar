import type { Env, RESTPostAPIWebhookWithTokenJSONBody } from "../../types";
import { APIVersion } from "../../const/discord/ourAPIVersion";

export default async function sendMessage(env: Env, payload: RESTPostAPIWebhookWithTokenJSONBody): Promise<void> {
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
