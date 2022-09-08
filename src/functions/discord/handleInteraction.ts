import type {
	APIChatInputApplicationCommandInteraction,
	APIInteraction,
	APIInteractionResponsePong,
	Env,
} from "../../types";
import { InteractionResponseType, InteractionType } from "../../const/discord/ourAPIVersion";
import handleCommand from "./handleCommand";
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
			await handleCommand(env, command);
			return new Response("Lamar invoked successfully!", { status: 200 });
		} else {
			return new Response("Interaction is not known.", { status: 404 });
		}
	} else {
		return new Response("This method is not allowed.", { status: 400 });
	}
}
