import type { Env, RESTGetAPIChannelMessagesResult, RESTPostAPIChannelMessagesBulkDeleteJSONBody } from "../../types";
import { APIVersion } from "../../const/discord/ourAPIVersion";

export default async function deletePreviousMessages(
	messages: RESTGetAPIChannelMessagesResult,
	env: Env,
): Promise<void> {
	const emptyResponse = 204;
	const auditLogReason = "Regular Channel Message Cleanup by Lamar (BOT)";

	if (messages.length === 1) {
		const headers = new Headers({
			Authorization: `Bot ${env.DISCORD_BOT_TOKEN}`,
			"X-Audit-Log-Reason": auditLogReason,
		});
		const url = `https://discord.com/api/v${APIVersion}/channels/${env.DISCORD_CHANNEL_ID}/messages/${messages[0].id}`;
		const init: RequestInit<RequestInitCfProperties> = {
			method: "DELETE",
			headers,
		};
		const response = await fetch(url, init);
		if (response.status !== emptyResponse) {
			throw new Error(`Error deleting previous message, status: ${response.status}`);
		}
	} else {
		const headers = new Headers({
			Authorization: `Bot ${env.DISCORD_BOT_TOKEN}`,
			"Content-Type": "application/json",
			"X-Audit-Log-Reason": auditLogReason,
		});

		const messageIds: string[] = [];
		messages.forEach((message) => {
			messageIds.push(message.id);
		});
		const payload: RESTPostAPIChannelMessagesBulkDeleteJSONBody = { messages: messageIds };

		const url = `https://discord.com/api/v${APIVersion}/channels/${env.DISCORD_CHANNEL_ID}/messages/bulk-delete`;
		const init: RequestInit<RequestInitCfProperties> = {
			method: "POST",
			headers,
			body: JSON.stringify(payload),
		};

		const response = await fetch(url, init);
		if (response.status !== emptyResponse) {
			throw new Error(`Error deleting previous message, status: ${response.status}`);
		}
	}
}
