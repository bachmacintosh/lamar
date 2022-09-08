import type {
	APIChatInputApplicationCommandInteraction,
	Env,
	RESTPostAPIInteractionCallbackJSONBody,
} from "../../types";
import { InteractionResponseType } from "../../const/discord/ourAPIVersion";
import getConfig from "../cloudflare/getConfig";
import respondToCommand from "./respondToCommand";
import setConfig from "../cloudflare/setConfig";

export default async function handleCommand(
	env: Env,
	command: APIChatInputApplicationCommandInteraction,
): Promise<void> {
	if (command.data.name === "lamar" && typeof command.data.options !== "undefined" && command.data.options.length > 0) {
		if (command.data.options[0].name === "quiet") {
			const config = await getConfig(env);
			if (config.verbose) {
				config.verbose = false;
				await setConfig(env, config);
				const message: RESTPostAPIInteractionCallbackJSONBody = {
					type: InteractionResponseType.ChannelMessageWithSource,
					data: {
						content: `Okay, I'll only let you know important stuff, homie.`,
					},
				};
				await respondToCommand(env, command.id, command.token, message);
			} else {
				const message: RESTPostAPIInteractionCallbackJSONBody = {
					type: InteractionResponseType.ChannelMessageWithSource,
					data: {
						content: `We already quiet, fool!`,
					},
				};
				await respondToCommand(env, command.id, command.token, message);
			}
		} else if (command.data.options[0].name === "start") {
			const config = await getConfig(env);
			if (config.status === "running") {
				const message: RESTPostAPIInteractionCallbackJSONBody = {
					type: InteractionResponseType.ChannelMessageWithSource,
					data: {
						content: `We're already running, fool!`,
					},
				};
				await respondToCommand(env, command.id, command.token, message);
			} else {
				config.status = "running";
				await setConfig(env, config);
				const message: RESTPostAPIInteractionCallbackJSONBody = {
					type: InteractionResponseType.ChannelMessageWithSource,
					data: {
						content: `We all up and running now fam.`,
					},
				};
				await respondToCommand(env, command.id, command.token, message);
			}
		} else if (command.data.options[0].name === "status") {
			const config = await getConfig(env);
			const message: RESTPostAPIInteractionCallbackJSONBody = {
				type: InteractionResponseType.ChannelMessageWithSource,
				data: {
					content: `Bot is ${config.status}, and ${config.verbose ? "is" : "is not"} being verbose.`,
				},
			};
			await respondToCommand(env, command.id, command.token, message);
		} else if (command.data.options[0].name === "stop") {
			const config = await getConfig(env);
			if (config.status === "stopped") {
				const message: RESTPostAPIInteractionCallbackJSONBody = {
					type: InteractionResponseType.ChannelMessageWithSource,
					data: {
						content: `We're already stopped, fool!`,
					},
				};
				await respondToCommand(env, command.id, command.token, message);
			} else {
				config.status = "stopped";
				await setConfig(env, config);
				const message: RESTPostAPIInteractionCallbackJSONBody = {
					type: InteractionResponseType.ChannelMessageWithSource,
					data: {
						content: `I'm stopped dead in my tracks cuz.`,
					},
				};
				await respondToCommand(env, command.id, command.token, message);
			}
		} else if (command.data.options[0].name === "verbose") {
			const config = await getConfig(env);
			if (config.verbose) {
				const message: RESTPostAPIInteractionCallbackJSONBody = {
					type: InteractionResponseType.ChannelMessageWithSource,
					data: {
						content: `We already verbose, fool!`,
					},
				};
				await respondToCommand(env, command.id, command.token, message);
			} else {
				config.verbose = true;
				await setConfig(env, config);
				const message: RESTPostAPIInteractionCallbackJSONBody = {
					type: InteractionResponseType.ChannelMessageWithSource,
					data: {
						content: `You gonna hear every detail from your boy Lamar.`,
					},
				};
				await respondToCommand(env, command.id, command.token, message);
			}
		}
	}
}
