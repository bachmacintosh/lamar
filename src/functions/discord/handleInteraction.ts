import type {
	APIChatInputApplicationCommandInteraction,
	APIInteraction,
	APIInteractionResponsePong,
	Env,
	RESTPostAPIInteractionCallbackJSONBody,
} from "../../types";
import { InteractionResponseType, InteractionType } from "../../const/discord/ourAPIVersion";
import respondToCommand from "./respondToCommand";
import verifyRequest from "../util/verifyRequest";

export default async function handleInteraction(request: Request, env: Env): Promise<Response> {
	if (request.method === "POST") {
		const authorized = await verifyRequest(request, env.DISCORD_PUBLIC_KEY);

		if (!authorized) {
			return new Response("Unauthorized, nice try.", { status: 401 });
		}

		const json = await request.json();
		const interaction = json as APIInteraction;

		if (interaction.type === InteractionType.Ping) {
			const pong: APIInteractionResponsePong = { type: InteractionResponseType.Pong };
			return new Response(JSON.stringify(pong), { status: 200 });
		} else if (interaction.type === InteractionType.ApplicationCommand) {
			const command = json as APIChatInputApplicationCommandInteraction;
			if (
				command.data.name === "lamar" &&
				typeof command.data.options !== "undefined" &&
				command.data.options.length > 0
			) {
				const message: RESTPostAPIInteractionCallbackJSONBody = {
					type: InteractionResponseType.ChannelMessageWithSource,
					data: {
						content: `Used Command ${command.data.name} / ${command.data.options[0].name}`,
					},
				};
				await respondToCommand(env, command.id, command.token, message);
				return new Response("Lamar invoked successfully!", { status: 200 });
			} else {
				return new Response("Interaction is not known.", { status: 404 });
			}
		} else {
			return new Response("Interaction is not known.", { status: 404 });
		}
	} else {
		return new Response("This method is not allowed.", { status: 400 });
	}
}
