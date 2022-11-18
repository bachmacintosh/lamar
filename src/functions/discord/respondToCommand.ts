import type { Env, RESTPostAPIInteractionCallbackJSONBody } from "../../types";
import { APIVersion } from "../../const/discord/ourAPIVersion";

export default async function respondToCommand(
	env: Env,
	id: string,
	token: string,
	message: RESTPostAPIInteractionCallbackJSONBody,
): Promise<void> {
	const url = `https://discord.com/api/v${APIVersion}/interactions/${id}/${token}/callback`;
	const headers = new Headers({
		Authorization: `Bot ${env.DISCORD_BOT_TOKEN}`,
		"Content-Type": "application/json",
	});
	const init: RequestInit<RequestInitCfProperties> = {
		method: "POST",
		body: JSON.stringify(message),
		headers,
	};

	await fetch(url, init);
}
